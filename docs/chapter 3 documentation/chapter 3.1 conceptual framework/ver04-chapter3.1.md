# CHAPTER 3: FRAMEWORK AND METHODOLOGY

## 3.1 CONCEPTUAL FRAMEWORK (Final Integrated Version)

This chapter outlines the conceptual framework and methodology for the development of **StegoLock**, a cloud based web application built on a reconstruction dependent security architecture for digital document storage. The core of this research is the **Reconstruction-Dependent Security Architecture**. This framework changes the traditional approach to security by moving beyond simply blocking access to a system. Instead, it ensures that data remains private because the information cannot be identified or put back together without the correct digital credentials. 

This model ensures that an attacker cannot find or rebuild the original data unless they have simultaneous access to the encryption keys, the map of the hidden pieces, and the encrypted data fragments stored in the cloud. This chapter also explains the design and logic of the system using the **Input-Process-Output (IPO)** method. This approach shows how sensitive user information is changed into a highly secure and invisible state. These principles guided the researchers in creating an application that follows modern security standards.

## 3.1.1 THE RECONSTRUCTION-DEPENDENT SECURITY ARCHITECTURE
The fundamental principle of StegoLock is **security through segmentation and obfuscation**. Rather than storing a document as a single file, the system breaks the data into small fragments and hides them inside everyday media (images, audio, and text). These "stego files" are subsequently stored in a centralized cloud bucket.

As illustrated in Figure 1, to reconstruct the original document, the system relies on three "pillars" that must be accessed simultaneously:
1.  **The Master Key:** This is a digital key derived from the user’s password. It serves as the unique credential required to unlock the document’s internal encryption key once the scattered data fragments have been reassembled.
2.  **The Stego-Map:** This serves as a digital blueprint stored within the system’s database. It maintains a precise record of which hidden data fragments belong to a specific document and the exact order required for reassembly.
3.  **The Stego Files:** These are the physical cover media (such as images, audio, or text files) stored in the cloud. To an unauthorized party, these appear as ordinary media files, yet they secretly contain the encrypted data fragments.

![3.1.1 figure 1](3.1.1%20figure%201.png)

*Figure 1: The Reconstruction-Dependent Security Model. This diagram specifically illustrates the system through the lens of the **Reconstruction Module** and does not represent the entire system architecture.*

**System Security:** These three pillars are functionally interdependent. If an unauthorized party accesses the files without the map, the correct data cannot be identified. If the map is accessed without the master key, the data remains encrypted and unreadable. Successful reconstruction through the **Reconstruction Module** requires the simultaneous presence of all three elements.

## 3.1.2 THE STEGOLOCK FRAMEWORK
While the reconstruction-dependent security architecture establishes the foundational requirements for data security, the **StegoLock framework** operationalizes these principles into the system’s functional design. This framework serves as the blueprint for its practical implementation, defining the logical transformation of data through an **Input-Process-Output (IPO) architecture** and detailing the functional flow that guides the movement of information across its core technical modules.

### 3.1.2.1 STEGOLOCK INPUT-PROCESS-OUTPUT ARCHITECTURE
The StegoLock Input-Process-Output (IPO) architecture serves as the foundational logic for the system’s data transformation. This architecture illustrates the transition of a vulnerable document into a secure, reconstruction-dependent state. By defining the specific inputs provided by the user, the multi-stage technical processes, and the final secured output, the IPO architecture ensures that every functional requirement of the framework is mapped to a clear operational result.

| Stage | Description |
| :--- | :--- |
| **Input** | The user provides a sensitive digital document (e.g., PDF, DOCX) and utilizes a library of cover media (PNG, WAV, and TXT files) provided by the system to act as data carriers. |
| **Process** | The system executes a four-stage security pipeline: <br>1. **Encryption:** AES-256-GCM encryption with ZLIB compression for authenticated confidentiality. <br>2. **Segmentation:** Splitting the encrypted payload into "Right-Sized" fragments based on cover capacity. <br>3. **Embedding:** Hiding fragments into cover files using steganographic techniques (LSB and bit-level modification). <br>4. **Cloud Integration:** Finalizing the **Stego-Map (Pillar 2)** and uploading the **Stego Files (Pillar 3)** as independent objects to a dedicated **Backblaze B2** bucket. |
| **Output** | A "Locked" document status within the platform. In the cloud storage environment, the data appears only as a collection of ordinary media files, with no visible relationship to the original document, the owner, or other related fragments. |

### 3.1.2.2 DATA FLOW AND FUNCTIONAL ARCHITECTURE
The **Data Flow and Functional Architecture** describes the dynamic journey of information as it moves through the StegoLock pipeline. Unlike a static model, this architecture emphasizes the sequential transformation of data from a single plaintext entity into a fragmented, steganographically hidden collection of objects.

![3.1.2 figure 2](3.1.2%20figure%202.png)
*Figure 2: Data Flow Diagram of the StegoLock Pipeline. This figure illustrates the movement of information through the sequential security modules and its eventual storage in the isolated database and cloud layers.*

This flow is managed by five core integrated modules that work in synchrony to maintain the integrity of the three pillars of reconstruction:

**A. Multi-Layered Cryptographic Protection**
This module manages the initial entry point of the data flow. The application utilizes **AES-256-GCM** for authenticated encryption, ensuring both confidentiality and data integrity. Security is further hardened by a hierarchical **Key Derivation Function (KDF)** system using PBKDF2 and HKDF. This ensures that document keys are "wrapped" and only accessible when the user provides their password, which reconstructs the **Master Key (Pillar 1)** temporarily for the active session.

**B. Diversity-Based Steganographic Engine**
Following the segmentation phase, this module manages the transformation of fragments into **Stego Files (Pillar 3)**. To increase resistance against steganalysis, StegoLock employs a **Diversity Defense** strategy, hiding data across different media formats to prevent the formation of uniform statistical patterns:
*   **Images (PNG):** Uses LSB encoding with a safety margin to preserve visual integrity.
*   **Audio (WAV):** Modifies least significant bits of audio samples to maintain acoustic transparency.
*   **Text (TXT):** Implements bit-level modifications to hide binary data within text streams.

**C. Centralized Obfuscated Cloud Storage**
This serves as the final destination in the primary data flow. All **Stego Files (Pillar 3)** are stored in a single **Backblaze B2 Cloud Storage** bucket. While the storage is centralized, security is maintained through **logical isolation and obfuscation**. Fragments from different users are intermingled as standalone objects. Without the system's private **Stego-Map (Pillar 2)**, an intruder would see only a generic repository of media files.

**D. Secure Collaborative Sharing**
This module provides a controlled alternative data flow path for collaborative access through **Key Re-wrapping**. When a document is shared, the system "unwraps" the document's key and re-protects it with the recipient's credentials. This allows users to grant "access to reconstruction" without exposing raw files or personal passwords.

**E. Reconstruction Module Execution**
This module represents the reverse data flow required for document restoration. The automated **Reconstruction Module** unifies the three pillars upon an authorized request. When a user provides the **Master Key (Pillar 1)**, the module utilizes the **Stego-Map (Pillar 2)** to identify and extract fragments from the **Stego Files (Pillar 3)**. These fragments are reassembled, decrypted, and decompressed in-memory, ensuring the original document is only visible during the active retrieval session.
