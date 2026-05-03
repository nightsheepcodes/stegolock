# Objective 4: Evaluate the application using ISO/IEC 25010 Quality Characteristics

## Objective Statement
To evaluate the application using a multi-method assessment framework aligned with ISO/IEC 25010 quality characteristics to assess the effectiveness of the reconstruction-dependent security model and measure usability and performance efficiency.

## 1. Evaluation Framework
The application is evaluated based on the **ISO/IEC 25010 System and Software Quality Model**, focusing on three primary pillars: Security, Performance Efficiency, and Usability.

## 2. Assessment Pillars

### A. Security (Effectiveness of the Reconstruction-Dependent Model)
The "Reconstruction-Dependent Security Model" is assessed based on the difficulty of data recovery without the system's mapping and key management.
*   **Confidentiality:** Verified through the successful application of AES-256-GCM and the scattering of fragments. Even a full breach of the cloud storage only yields encrypted fragments hidden in unrelated cover files.
*   **Integrity:** Measured by the GCM authentication tags. The system identifies "Zombie Fragments" (failed or tampered fragments) via the Admin Dashboard.
*   **Accountability:** All sensitive actions (locking, unlocking, sharing, deleting) are logged in the `ActivityLog` and `DocumentActivity` tables, providing a complete audit trail.

### B. Performance Efficiency
The application's efficiency is measured by its ability to handle complex cryptographic and steganographic tasks without compromising the user experience.
*   **Time Behavior:** Evaluated by the responsiveness of the web interface. Long-running processes (steganography and fragment retrieval) are dispatched to background queues (`ProcessSteganoJob` and `ProcessUnlockJob`), allowing users to continue interacting with the platform.
*   **Resource Utilization:** The **Admin Infrastructure Dashboard** tracks "Cloud Composition," comparing the size of original fragments against the overhead of cover files to measure storage efficiency.
*   **Capacity:** The system monitors the "Library Utility," tracking the total available capacity of the cover file pool and alerting administrators when the pool is near exhaustion.

### C. Usability
Usability is assessed through user interaction with the premium React-based interface.
*   **Aesthetics:** The UI uses a modern design system (Inertia.js + React) to provide a premium feel, making complex security tasks intuitive.
*   **Operability:** The platform simplifies the "Locking" and "Unlocking" workflows into single-click actions, hiding the underlying complexity of encryption, segmentation, and steganography from the end-user.
*   **Learnability:** Clear status indicators (e.g., "Fragmented," "Mapped," "Stored") guide the user through the document lifecycle.

## 3. Evidence of Evaluation Metrics (Code References)

| Metric Category | Implementation | File Reference |
| :--- | :--- | :--- |
| **Integrity Monitoring** | Tracking "Zombie" (failed) fragments and database health. | [AdminDashboardController.php:L54-68](file:///d:/laragon/www/stegolock/app/Http/Controllers/Admin/AdminDashboardController.php#L54-L68) |
| **Resource Monitoring** | Infrastructure composition (Covers vs fragments). | [AdminDashboardController.php:L78-83](file:///d:/laragon/www/stegolock/app/Http/Controllers/Admin/AdminDashboardController.php#L78-L83) |
| **Audit Trail** | System-wide activity logging for accountability. | [AdminDashboardController.php:L40-43](file:///d:/laragon/www/stegolock/app/Http/Controllers/Admin/AdminDashboardController.php#L40-L43) |
| **Capacity Management** | Monitoring total steganographic pool capacity. | [AdminDashboardController.php:L89-95](file:///d:/laragon/www/stegolock/app/Http/Controllers/Admin/AdminDashboardController.php#L89-L95) |

## 4. Conclusion
Objective 4 is in the **final assessment phase**. While full usability testing with participants is ongoing, the internal metrics and infrastructure monitoring built into the application already demonstrate a high degree of performance efficiency and security integrity according to the ISO/IEC 25010 framework.
