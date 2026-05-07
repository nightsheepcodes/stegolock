# CHAPTER 3: FRAMEWORK AND METHODOLOGY

## 3.1 CONCEPTUAL FRAMEWORK (Final Integrated Version)

This chapter outlines the conceptual framework and methodology for the development of **StegoLock**, a cloud based web application built on a reconstruction dependent security architecture for digital document storage. The core of this research is the **Reconstruction-Dependent Security Model**. This framework changes the traditional approach to security by moving beyond simply blocking access to a system. Instead, it ensures that data remains private because the information cannot be identified or put back together without the correct digital credentials. 

This model ensures that an attacker cannot find or rebuild the original data unless they have simultaneous access to the encryption keys, the map of the hidden pieces, and the encrypted data fragments stored in the cloud. This chapter also explains the design and logic of the system using the **Input-Process-Output (IPO)** method. This approach shows how sensitive user information is changed into a highly secure and invisible state. These principles guided the researchers in creating an application that follows modern security standards.

## 3.1.1 THE RECONSTRUCTION-DEPENDENT SECURITY MODEL
The fundamental principle of StegoLock is **security through segmentation and obfuscation**. Rather than storing a document as a single file, the system breaks the data into small fragments and hides them inside everyday media (images, audio, and text). These "stego files" are subsequently stored in a centralized cloud bucket.

As illustrated in Figure 1, to reconstruct the original document, the system relies on three "pillars" that must be accessed simultaneously:
1.  **The Master Key:** This is a digital key derived from the user’s password. It serves as the unique credential required to unlock the document’s internal encryption key once the scattered data fragments have been reassembled.
2.  **The Stego-Map:** This serves as a digital blueprint stored within the system’s database. It maintains a precise record of which hidden data fragments belong to a specific document and the exact order required for reassembly.
3.  **The Stego Files:** These are the physical cover media (such as images, audio, or text files) stored in the cloud. To an unauthorized party, these appear as ordinary media files, yet they secretly contain the encrypted data fragments.

![3.1.1 figure 1](3.1.1%20figure%201.png)
*Figure 1: The Reconstruction-Dependent Security Model. This diagram specifically illustrates the system through the lens of the **Reconstruction Module** and does not represent the entire system architecture.*

**System Security:** These three pillars are functionally interdependent. If an unauthorized party accesses the files without the map, the correct data cannot be identified. If the map is accessed without the master key, the data remains encrypted and unreadable. Successful reconstruction through the **Reconstruction Module** requires the simultaneous presence of all three elements.

## 3.1.2 THE STEGOLOCK FRAMEWORK
Building upon the principles of the reconstruction-dependent security model, the **StegoLock Framework** serves as the structured approach to its practical implementation. This framework provides a detailed overview of the system’s functional flow and the core technical modules that enable its operations.

### 3.1.2.1 STEGOLOCK INPUT-PROCESS-OUTPUT MODEL
The Input-Process-Output (IPO) model below delineates the functional flow of the StegoLock system, showing how inputs are processed through a multi-stage security pipeline to produce a secured output.

| Stage | Description |
| :--- | :--- |
| **Input** | The user provides a sensitive digital document (e.g., PDF, DOCX) and utilizes a library of cover media (PNG, WAV, and TXT files) provided by the system to act as data carriers. |
| **Process** | The system executes a four-stage security pipeline: <br>1. **Encryption:** AES-256-GCM encryption with ZLIB compression for authenticated confidentiality. <br>2. **Segmentation:** Splitting the encrypted payload into "Right-Sized" fragments based on cover capacity. <br>3. **Embedding:** Hiding fragments into cover files using steganographic techniques (LSB and bit-level modification). <br>4. **Cloud Integration:** Finalizing the **Stego-Map (Pillar 2)** and uploading the **Stego Files (Pillar 3)** as independent objects to a dedicated **Backblaze B2** bucket. |
| **Output** | A "Locked" document status within the platform. In the cloud storage environment, the data appears only as a collection of ordinary media files, with no visible relationship to the original document, the owner, or other related fragments. |

### 3.1.2.2 SYSTEM FEATURES AND FUNCTIONALITIES
The conceptual framework is operationalized through six core integrated modules:

**A. Multi-Layered Cryptographic Protection**
The application utilizes **AES-256-GCM** for authenticated encryption, ensuring both confidentiality and data integrity. Security is further hardened by a hierarchical **Key Derivation Function (KDF)** system using PBKDF2 and HKDF. This ensures that document keys are "wrapped" and only accessible when the user provides their password, which reconstructs the **Master Key (Pillar 1)** temporarily for the active session.

**B. Diversity-Based Steganographic Engine**
To increase resistance against steganalysis, StegoLock employs a **Diversity Defense** strategy. By hiding data across different media formats to create the **Stego Files (Pillar 3)**, the system prevents the formation of uniform statistical patterns that could be detected by automated scanners:
*   **Images (PNG):** Uses LSB encoding with a safety margin to preserve visual integrity.
*   **Audio (WAV):** Modifies least significant bits of audio samples to maintain acoustic transparency.
*   **Text (TXT):** Implements bit-level modifications to hide binary data within text streams.

**C. Centralized Obfuscated Cloud Storage**
All **Stego Files (Pillar 3)** are stored in a single **Backblaze B2 Cloud Storage** bucket. While the storage is centralized, security is maintained through **logical isolation and obfuscation**. Fragments from different users are intermingled as standalone objects. Without the system's private **Stego-Map (Pillar 2)**, an intruder would see only a generic repository of media files, unable to determine which files contain hidden data or how they are related.

**D. Secure Collaborative Sharing**
StegoLock facilitates secure sharing through **Key Re-wrapping**. When a document is shared, the system "unwraps" the document's key and re-protects it with the recipient's credentials. This allows users to grant "access to reconstruction" without exposing raw files or personal passwords.

**E. Administrative Infrastructure Oversight**
For system-wide integrity, the framework includes a **Superadmin Dashboard** for infrastructure monitoring. This functionality tracks the total capacity of the steganographic pool and identifies "zombie fragments" (orphaned or tampered files), ensuring the system remains a reliable and efficient storage platform.

**F. Reconstruction Module Execution**
The system features an automated **Reconstruction Module** designed to unify the three pillars upon an authorized request. When a user provides the **Master Key (Pillar 1)**, the module utilizes the **Stego-Map (Pillar 2)** to identify and extract fragments from the **Stego Files (Pillar 3)**. These fragments are reassembled, decrypted, and decompressed in-memory, ensuring the original document is only visible during the active retrieval session.
