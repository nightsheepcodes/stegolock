## 3.1 Conceptual Framework (Reframed Cloud Storage)

The conceptual framework of **Stegolock** is built upon a **"Reconstruction-Dependent Security Model."** This model shifts the security focus from simply protecting a single file to ensuring that an unauthorized party cannot identify or reassemble the original data. Even with access to the cloud storage, the data remains inaccessible because it exists only as fragmented, encrypted, and hidden components within a large pool of harmless media.

The framework follows the **Input-Process-Output (IPO)** model, demonstrating the transformation of sensitive documents into an obfuscated state within a centralized cloud environment.

### 3.1.1 The Reconstruction-Dependent Security Model
The fundamental principle of Stegolock is **security through disintegration**. Rather than storing a document as a single encrypted entity, the system breaks it into pieces that are hidden inside unrelated cover files (Images, Audio, and Text). These "stego-files" are then stored in a centralized cloud bucket. The security of the document is dependent on three pillars that are only unified during an authorized reconstruction:
1.  **The Master Key:** Derived from the user's password to unlock the cryptographic layer.
2.  **The Stego-Map:** The internal database logic that identifies which specific fragments in the cloud belong to a particular document.
3.  **The Stego-Library:** A centralized repository of media files where fragments are stored as standalone, unlinked objects.

### 3.1.2 Input-Process-Output (IPO) Analysis

| Stage | Description |
| :--- | :--- |
| **Input** | The user provides a sensitive document and the system utilizes a library of cover media (PNG, WAV, and TXT files) to act as carriers. |
| **Process** | The system executes a four-stage security pipeline: <br>1. **Encryption:** AES-256-GCM encryption with ZLIB compression. <br>2. **Segmentation:** Splitting the encrypted payload into "Right-Sized" fragments. <br>3. **Embedding:** Hiding fragments into cover files using steganography. <br>4. **Cloud Integration:** Uploading the resulting stego-files as independent objects to a dedicated **Backblaze B2** bucket. |
| **Output** | A "Locked" document status. In the cloud, the data appears only as a collection of ordinary media files, with no visible relationship to the original document or the user. |

---

### 3.1.3 System Features and Functionalities

#### A. Multi-Layered Cryptographic Protection
The application utilizes **AES-256-GCM** for authenticated encryption. Security is further hardened by a hierarchical **Key Derivation Function (KDF)** system. Using PBKDF2 and HKDF, the system ensures that document keys are "wrapped" and only accessible when the user provides their password, which reconstructs the master key in memory for that session.

#### B. Diversity-Based Steganographic Engine
To frustrate steganalysis (the detection of hidden data), Stegolock employs a **Diversity Defense** strategy. It hides data across different media formats, making it harder for automated scanners to find patterns:
*   **Images (PNG):** Uses LSB encoding with a safety margin to preserve visual integrity.
*   **Audio (WAV):** Modifies least significant bits of audio samples to maintain acoustic transparency.
*   **Text (TXT):** Implements bit-level modifications to hide binary data within text streams.

#### C. Centralized Obfuscated Cloud Storage
All stego-files are stored in a single **Backblaze B2 Cloud Storage** bucket within a dedicated folder. While the storage is centralized, the security is maintained through **logical isolation**. Fragments from different users and different documents are intermingled in the same location as standalone objects. Without the system's private `StegoMap`, an intruder looking at the bucket would see only a generic folder of media files, unable to determine which files contain data, which ones belong together, or who the owners are.

#### D. Secure Collaborative Sharing
Stegolock facilitates secure sharing through **Key Re-wrapping**. When a document is shared, the system unwraps the document's key and re-protects it with the recipient's credentials. This allows users to grant "access to reconstruction" without ever exposing the raw file or their personal passwords.

#### E. Administrative Infrastructure Oversight
The framework includes a **Superadmin Dashboard** designed for infrastructure health. It monitors the total capacity of the steganographic pool and identifies "zombie fragments" (orphaned or tampered files) in the Backblaze B2 bucket, ensuring the system remains reliable for all users.
