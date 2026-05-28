# StegoLock: Attack Surface & Threat Modeling Analysis

**Document Status:** Approved for Technical Defense  
**Auditing Focus:** Threat Vectors, Component Vulnerability, and Compromise Resistance  
**Target Architecture:** Distributed Steganographic & Cryptographic Storage System

---

## Introduction: The "Shared-Nothing" Security Model

The security of StegoLock does not depend on keeping the algorithms secret, nor does it rely solely on the perimeter security of a single server. It is built on a **"Shared-Nothing" and "Separation of Concerns" security model**. 

To compromise a user's document, an attacker must compromise **three distinct and isolated layers of the system**:
1. **The Cloud Object Storage (The Carrier Pool)**: Where the physical stego files (PNG, WAV, TXT) are stored.
2. **The Database Server (The Relational Blueprint)**: Where the database mapping table structures (`stego_files`, `stego_maps`, `fragment_maps`) are stored.
3. **The User's Password / Key Derivation (The Cryptographic Key)**: Which derived key is required to decrypt the `master_key_enc` stored in the database.

A compromise in **only one** of these components does not lead to a data breach. Below, we break down each component, its specific attack surface, the variables vulnerable to compromise, and StegoLock's structural resistance.

---

## 1. Cloud Object Storage (e.g., Backblaze B2 / AWS S3)

This is the storage location of the stego carrier files. It is often the most exposed component because cloud buckets are vulnerable to credential leaks, access token thefts, or public bucket misconfigurations.

```
[Attacker with Cloud Access] 
     │
     ├──> Downloads: "9a7f3b8c2d1e...png" (Stego Image Carrier)
     ├──> Downloads: "4f2d8c3e1a9b...wav" (Stego Audio Carrier)
     │
     └──> Result: Extracted fragments are encrypted (AES-256-GCM).
                  Attacker has NO maps to know which fragments belong together.
```

### A. Attack Surface Vectors
* **Bucket Credential Theft**: An attacker steals S3/B2 credentials (API keys) via a compromised developer machine or server environment leak.
* **Public Bucket Misconfiguration**: The bucket's access control is accidentally set to public, allowing anyone to read or list all stego files.
* **Carrier Eavesdropping/Extraction**: An attacker downloads a carrier file (e.g., a PNG image) and applies standard stego-extraction (2-bit LSB decoding) to recover the raw hidden binary shard.

### B. Vulnerability Variables & Impact
* **Integrity / Tampering Attacks (High Risk)**: If an attacker gains write/delete access to the bucket, they can delete stego files or modify random bytes within them. When a user tries to retrieve the file, the fragment extraction will pull modified bytes. 
  * *Impact*: High availability/integrity damage. The reassembly will fail during AES-256-GCM decryption because the GCM authentication tag will fail to validate the tampered ciphertext, preventing corruption but resulting in a denial-of-service.
* **Information Disclosure (Low Risk)**: If an attacker extracts a fragment, they obtain the binary shard.
  * *Impact*: Negligible. The extracted shard is AES-256-GCM encrypted. Without the relational maps and the Master Key, it is mathematically indistinguishable from random noise.
* **Linkability (Zero Risk)**: The files are stored in the bucket with randomized UUID names (e.g., `bin2hex(random_bytes(16)) .time() . '.png'`). There is absolutely no link, metadata, or header in the cloud storage connecting one stego file to another, or to a specific user/document.

---

## 2. Database Server (MySQL / PostgreSQL / SQLite)

The database stores the master relational map (the "blueprint" of how shards are fragmented and embedded) and the encrypted user master keys.

### A. Attack Surface Vectors
* **SQL Injection (SQLi)**: An attacker exploits an unvalidated query input in the web application to execute arbitrary database commands.
* **Database Backup Leakage**: Exposed database dump files (e.g., `.sql` backup files left in public web root directories or standard backup locations) are downloaded by unauthorized parties.
* **Server-Side Connection Takeover**: Compromising the Laravel `.env` configuration file to obtain database credentials and connect directly to the database port (3306).

### B. Vulnerability Variables & Impact
* **Relational Blueprint Exposure (High Impact)**: The database maps (`stego_files` and `stego_maps`) link fragment UUIDs, index numbers, offsets, and cloud filenames together.
  * *Impact*: If an attacker has this map, they know exactly which files to download from the cloud bucket, and in what order to join them to reconstruct the full ciphertext.
* **Cryptographic Materials Leakage (Medium Impact)**: The `users` table holds the user's `master_key_enc`, `nonce`, `tag`, `auth_salt`, and `ek_salt`.
  * *Impact*: The attacker obtains the wrapped (encrypted) Master Key. However, they *still* cannot decrypt it without performing an offline brute-force attack on the user's password to derive the decryption key (using the 100k-iteration PBKDF2 salt).
* **Cross-Tenant Access**: If the DB is compromised, the attacker can view the file sharing permissions (`document_shares`), circumventing the application logic that restricts file access.

---

## 3. Web Application Runtime & Local Storage (PHP / Laravel)

The local web server acts as the orchestrator. It executes the cryptographic and steganographic processes, handles active session states, and manages background queue workers.

### A. Attack Surface Vectors
* **Remote Code Execution (RCE)**: Exploiting vulnerability in web server libraries to execute local system commands.
* **Session Hijacking / CSRF**: Hijacking an authenticated user's session cookie.
* **Local Temp Directory Inspection**: Gaining local access to read temporary files generated during high-CPU operations.

### B. Vulnerability Variables & Impact
* **Temporary File Persistence (Medium Impact)**: During the "Locking" and "Unlocking" processes, the application writes unencrypted shards to local temporary disk storage (e.g., `storage/app/private/temp/jobs/{jobId}`) before embedding them in carriers or after retrieving them from carriers.
  * *Impact*: If a job fails or the server crashes abruptly (preventing the `ProcessSteganoJob`'s `finally { cleanup() }` block from running), unencrypted fragments or decrypted source files can remain on the server's persistent disk, vulnerable to local system compromise.
* **Redis Key Leakage (High Impact)**: Active session master keys are stored temporarily in volatile memory (**Redis via TemporaryKeyStorage**).
  * *Impact*: If the Redis instance is exposed (e.g., open port 6379, weak credentials, or shared hosting), an attacker can read active session tokens and retrieve active Master Keys, allowing them to decrypt any documents belonging to those currently logged-in users.
* **Command Injection via Subprocess (Low Impact)**: The PHP runtime invokes the Python stego script via shell execution.
  * *Impact*: Mitigated by strict argument escaping (`escapeshellarg()`), but if an attacker could control the `python_binary` path or inject malicious system variables, they could achieve local code execution.

---

## 4. The Python Steganography Subsystem (`python_backend`)

The Python scripts process the low-level pixel (LSB) and audio sample modifications.

### A. Attack Surface Vectors
* **Malicious Carrier Uploads (Stego-Bombing)**: A user uploads a specially crafted PNG or WAV carrier that exploits parsing bugs or triggers extreme resource allocation in python libraries.
* **Subprocess Hanging**: An input file causes the Python script to freeze or enter an infinite loop.

### B. Vulnerability Variables & Impact
* **Denial of Service (DoS)**: Zip-bombs or polyglot files that exhaust RAM during numpy array manipulation, crashing the background queue workers.
* **Carrier Leakage**: The Python script reads raw carrier bytes. If standard temporary files are not scrubbed on the Python side, leftovers can be exposed.

---

## 5. Summary Threat Matrix & StegoLock Resistance

| Component / Target | Primary Threat Vector | Potential Security Impact | StegoLock Technical Resistance |
| :--- | :--- | :--- | :--- |
| **Stego Files in Cloud Bucket** | Unauthorized bucket download / Leakage | **Low**: Files are encrypted shards with random names. Cannot be decrypted or linked without DB maps and Master Key. | **Symmetric AES-256-GCM** encryption on every fragment; Randomized UUID filenames. |
| **Stego Files in Cloud Bucket** | Deletion / Data Tampering | **High**: Permanent data loss or reassembly denial of service. | **Galois/Counter Mode (GCM)** authentication tags detect tampering instantly; **Multicarrier dispersion** keeps loss isolated to shards. |
| **Relational DB Maps** | SQL Injection / Backup Leakage | **High**: Attacker reconstructs fragment order and links B2 files. | **Strict Query Parameterization** (Eloquent ORM) and schema separation of relational maps. |
| **User Cryptographic Salts** | SQL Injection / DB Takeover | **Medium**: Attacker obtains salts to execute offline brute-force. | **PBKDF2-HMAC-SHA256 with 100,000 iterations** dynamically slows down cracking speeds. |
| **Web Server Temp Storage** | Job Crash / Local File Access | **Medium**: Residual unencrypted shards left on persistent local disk. | **Mutex lockouts** and **mandatory cleanup hooks** inside the job execution lifecycle (`ProcessSteganoJob::cleanup()`). |
| **Active Session Memory** | Unsecured Redis Instance access | **High**: Attacker extracts decrypted active Master Keys. | **Key-in-Memory isolation** using random Redis tokens with strict **5-minute TTL / session boundaries**. |

---

## Conclusion: How to Defend Your System to the Panel

When the review panel asks: *"What happens if your cloud storage is hacked?"* or *"What if your database is compromised?"*, you can confidently answer using these **empirically supported architecture paradigms**:

1. **Compromised Cloud Storage**: *"If the Backblaze B2 bucket is fully compromised, the hacker obtains only an un-linkable pool of randomized PNG and WAV carrier files. If they extract the hidden data via LSB steg-analysis, they get only individual AES-256-GCM encrypted shards. They cannot reconstruct the file because they do not have the database mapping keys, and they cannot decrypt them because they do not have the user's Master Key."*
2. **Compromised Database**: *"If our database is breached, the attacker gains the assembly maps and the encrypted user master keys (`master_key_enc`). However, they still cannot read any documents because the actual shards are in B2, and the Master Key is securely locked. To decrypt it, they must crack the user's password, which is highly resistant to brute-forcing due to 100,000 rounds of PBKDF2 derivation."*
3. **Double Compromise (Cloud + DB)**: *"Even if BOTH the database and the cloud storage are breached, the files are STILL secure. The attacker has the mapping blueprint and can assemble the encrypted shards, but they are still locked behind AES-256-GCM. The encryption key remains uncompromised because it was never stored in the database or cloud; it is derived only during active user sessions."*
