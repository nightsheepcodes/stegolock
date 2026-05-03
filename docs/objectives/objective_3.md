# Objective 3: Develop an integrated web-based document storage platform

## Objective Statement
To develop a web-based application that implements and integrates the AES-based encryption, segmentation, access control and authentication, and sharing mechanisms into a document storage platform.

## 1. Application Architecture
Stegolock is built as a modern, full-stack web application using the following technology stack:
*   **Backend:** Laravel 11 (PHP) providing a robust MVC architecture, background job processing, and RESTful APIs.
*   **Frontend:** React with Inertia.js, creating a seamless "Single Page Application" (SPA) experience without the complexity of a separate API layer.
*   **Database:** MySQL for structured data (Users, Documents, Fragments, Maps, Shares).
*   **Cloud Storage:** Backblaze B2 for storing steganographic cover files.
*   **Cryptographic Engine:** OpenSSL (PHP) and Python-based steganography scripts.

## 2. Integrated Security Modules

### A. Authentication & Access Control
The application implements a customized authentication system where security is integrated into the login flow.
*   **KDF-Integrated Login:** The login process doesn't just check a hash; it reconstructs the user's `Master Key` in memory for that session.
*   **Role-Based Access Control (RBAC):** Distinct roles (User, Admin, Superadmin) manage system resources, with specific dashboards for each.
*   **Middleware Protection:** All document routes are protected by Laravel's `auth` middleware and custom policy checks.

### B. Sharing Mechanisms
Stegolock features a sophisticated sharing system that maintains end-to-end security through key re-wrapping.
*   **Direct Document Sharing:** Allows users to share specific files with other registered users via email.
*   **Folder Sharing:** A recursive sharing mechanism that grants access to all current and future documents within a folder.
*   **Cryptographic Handover:** When a document is shared, the system unwraps the DEK (using the owner's key) and re-wraps it (using the recipient's key or a system-wide share key), ensuring the recipient can unlock the file with their own password.

## 3. User Interface & Experience (UX)
The frontend is designed for high utility and visual feedback:
*   **MyDocuments:** A centralized hub for managing file lifecycles (Upload -> Lock -> Store -> Unlock).
*   **SharedDocuments:** A dedicated view for managing incoming and outgoing shared resources.
*   **Real-time Progress:** Use of Laravel Jobs and status polling to provide users with updates on the complex background steganography process.

## 4. Evidence of Achievement (Code References)

| Component | Logic Description | File Reference |
| :--- | :--- | :--- |
| **Authentication** | Integrated PBKDF2/AES Master Key recovery. | [AuthenticatedSessionController.php](file:///d:/laragon/www/stegolock/app/Http/Controllers/Auth/AuthenticatedSessionController.php) |
| **Document Sharing** | Key re-wrapping and share creation. | [DocumentController.php:L749-821](file:///d:/laragon/www/stegolock/app/Http/Controllers/DocumentController.php#L749-L821) |
| **Folder Sharing** | Recursive sharing of folder contents. | [DocumentController.php:L879-971](file:///d:/laragon/www/stegolock/app/Http/Controllers/DocumentController.php#L879-L971) |
| **Frontend UI** | Main user dashboard in React. | [MyDocuments.jsx](file:///d:/laragon/www/stegolock/resources/js/Pages/MyDocuments.jsx) |
| **Sharing UI** | Management of shared documents in React. | [SharedDocuments.jsx](file:///d:/laragon/www/stegolock/resources/js/Pages/SharedDocuments.jsx) |

## 5. Conclusion
Objective 3 has been **fully achieved**. The project has transitioned from individual security components into a unified, functional web application. The integration of complex background processes (steganography) with a responsive user interface and a secure sharing model demonstrates a complete document storage platform.
