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

## 3.2 SYSTEMATIC RESTRUCTURING PLAN

This plan outlines the systematic restructuring of Section 3.1.2 to differentiate between the logical IPO, the structural System Architecture, and the dynamic Data Flow.

### Step 1: Definition of Perspective (Mental Alignment)
Before drafting, we establish a strict boundary for each section:
- **IPO (3.1.2)**: The "Black Box" view. What goes in, what happens generally, what comes out.
- **Architecture (3.1.2.1)**: The "Blueprint" view. Where components sit and how they are connected (Frontend, Backend, DB, Cloud).
- **Data Flow (3.1.2.2)**: The "Journey" view. How data changes state (Plaintext -> Ciphertext -> Fragments) as it moves through the architecture.

---

### Step 2: Refine the IPO Table (Section 3.1.2)
**Goal:** Provide the "General Overview" without technical jargon overload.
- [ ] **Action:** Update the IPO table to categorize Inputs into **User-Provided** and **System-Provided**.
- [ ] **Action:** Ensure the "Output" clearly mentions both the **Cloud Objects** and the **Database Metadata** to set the stage for the Pillar model.

### Step 3: Develop the System Architecture (Section 3.1.2.1)
**Goal:** Show the structural "Layers" and "Pillars."
- [ ] **Action:** Create/Describe a **Layered Architecture Diagram**:
    - **Layer 1: User Interface** (Inertia.js/React).
    - **Layer 2: Application Logic** (Laravel for orchestration, Python for steganography).
    - **Layer 3: Persistence Layer** (MySQL for the "Map" - Pillar 2).
    - **Layer 4: Storage Layer** (Backblaze B2 for "Stego-Files" - Pillar 3).
- [ ] **Action:** Explain the **Communication Path**: How the Backend acts as the bridge between the DB and the Cloud, ensuring they never interact directly.

### Step 4: Develop the Data Flow & Functional Architecture (Section 3.1.2.2)
**Goal:** Show the "Lifecycle" of a document.
- [ ] **Action:** Document the **Locking Lifecycle (Input -> Secure State)**:
    - Focus on state changes: Document -> Compressed Blob -> Encrypted Ciphertext -> Segmented Fragments -> Stego-Objects.
- [ ] **Action:** Document the **Unlocking Lifecycle (Retrieval -> Reconstruction)**:
    - **CRITICAL:** Show how Pillar 1 (Master Key) unlocks Pillar 2 (Map) to find Pillar 3 (Files).
- [ ] **Action:** Map specific features (Upload, Share, Delete) to these flows.

---

### Step 5: Final Integration & Terminology Check
**Goal:** Consistency.
- [ ] **Action:** Ensure terms like "Stego-Map" and "Stego-Files" are used consistently across all three sections.
- [ ] **Action:** Verify that 3.1.2.1 doesn't repeat the "how to encrypt" details found in 3.1.2.2.

### Verification Plan
1. **Structural Check:** Does Section 3.1.2.1 focus on *Components* (Software/Hardware)?
2. **Logic Check:** Does Section 3.1.2.2 focus on the *Transformation* of data?
3. **Completeness Check:** Is the "Reconstruction" (Unlocking) process as detailed as the "Locking" process?
