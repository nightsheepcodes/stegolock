## 3.1 Conceptual Framework (Initial Draft)

The conceptual framework of **Stegolock** is centered around a novel **"Reconstruction-Dependent Security Model."** This model shifts the security paradigm from merely preventing access to a single file to ensuring that an adversary cannot even identify, let alone reconstruct, the original data without simultaneous access to the cryptographic keys, the steganographic mapping, and the distributed cloud fragments.

The framework is structured using the **Input-Process-Output (IPO)** model, which illustrates how the system transforms vulnerable user data into a highly secured, "invisible" state.

### 3.1.1 The Reconstruction-Dependent Security Model
The core logic of Stegolock is that security is achieved through **disintegration and obfuscation**. Unlike traditional encryption where a single intercepted file can be subjected to brute-force attacks, Stegolock ensures that no single "file" exists in the cloud. Instead, a document is fragmented into pieces that are hidden inside unrelated media (Images, Audio, and Text) and scattered across various cloud locations. The system’s security is therefore dependent on the user's ability to reconstruct the pieces—a process that requires:
1.  **The Master Key:** Derived from the user's password using PBKDF2 to unlock the Data Encryption Keys (DEK).
2.  **The Stego-Map:** A database record that tracks which fragments are hidden in which cover files.
3.  **The Cloud Fragments:** The physical stego-files stored in Backblaze B2.

### 3.1.2 Input-Process-Output (IPO) Analysis

| Stage | Description |
| :--- | :--- |
| **Input** | The user provides a sensitive document (e.g., PDF, DOCX, TXT) and the system provides or allows the selection of cover media files (PNG images, WAV audio, or TXT files). |
| **Process** | The system executes a four-stage pipeline: <br>1. **Encryption:** AES-256-GCM encryption with ZLIB compression. <br>2. **Segmentation:** "Right-Sized Fluid Splitting" of the encrypted payload into fragments. <br>3. **Embedding:** Hiding fragments into cover files using LSB (Least Significant Bit) steganography. <br>4. **Scattering:** Uploading stego-files to distributed cloud storage (Backblaze B2). |
| **Output** | A "Locked" document status within the web platform, represented by scattered stego-files that appear as harmless media to unauthorized observers. |

---

### 3.1.3 System Features and Functionalities

#### A. Multi-Layered Cryptographic Protection
The system ensures confidentiality and integrity through **AES-256-GCM** authenticated encryption. Key management is handled via a hierarchical **KDF (Key Derivation Function)** system using PBKDF2 and HKDF. This ensures that the user's actual password is never stored, and document keys (DEKs) are protected by a master key that only exists in memory during an active session.

#### B. Diversity-Based Steganographic Engine
To increase the complexity of detection (steganalysis), the system utilizes a **Diversity Defense** strategy. It supports three distinct media types for embedding:
*   **Images (PNG):** Uses LSB encoding with a 15% safety margin to prevent visual artifacts.
*   **Audio (WAV):** Modifies least significant bits of audio samples to maintain acoustic transparency.
*   **Text (TXT):** Implements bit-level modifications and random offset embedding.

#### C. Cloud-Based Distributed Storage (Scattering)
The system eliminates "single-point-of-failure" risks by scattering fragments across **Backblaze B2 Cloud Storage**. Each fragment is treated as an independent object. Without the system's internal mapping logic, a breach of the cloud storage would only reveal harmless-looking media files with no apparent connection to each other or the original user document.

#### D. Secure Collaborative Sharing
Stegolock features a **Cryptographic Handover** mechanism. When a document is shared, the system "re-wraps" the document’s encryption key using the recipient's public/master key. This allows the recipient to unlock the shared document using their own credentials without the owner ever having to share their private password.

#### E. Administrative Infrastructure Oversight
For system integrity, the framework includes a **Superadmin Control Center**. This functionality monitors the health of the "Stego Library," tracks storage composition, and identifies "zombie fragments" (failed or tampered pieces), ensuring the reliability of the reconstruction process.
