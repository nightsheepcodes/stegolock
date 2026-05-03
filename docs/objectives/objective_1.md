# Objective 1: Implement AES-based encryption with a KDF-based key management process

## Objective Statement
To implement AES-based encryption with a KDF-based key management process to ensure the confidentiality and integrity of a document file.

## 1. Implementation Overview
The Stegolock application implements a multi-layered cryptographic architecture that combines industry-standard encryption (AES-256-GCM) with robust key derivation functions (PBKDF2 and HKDF). The system follows an "Envelope Encryption" pattern where document-specific keys are protected by user-specific master keys.

## 2. Technical Implementation Details

### A. AES-based Encryption (Confidentiality & Integrity)
The system uses **AES-256-GCM (Galois/Counter Mode)** for all data encryption tasks. Unlike standard AES modes, GCM provides both confidentiality and built-in integrity verification through an authentication tag.

*   **Encryption Algorithm:** AES-256-GCM.
*   **Key Length:** 256-bit.
*   **Integrity Check:** A 16-byte authentication tag is generated during encryption and verified during decryption. If a single bit of the encrypted file is altered, decryption will fail, ensuring data integrity.
*   **Compression:** Before encryption, files are compressed using the ZLIB (`gzcompress`) algorithm at the maximum compression level (9). This reduces the data footprint and eliminates statistical patterns in the plaintext.

### B. KDF-based Key Management
The application implements a hierarchical key management system to ensure that the user's plain-text password is never stored and that keys are derived securely.

1.  **User Authentication (PBKDF2):**
    *   Passwords are processed using **PBKDF2 with SHA-256**.
    *   **Iterations:** 100,000 (meeting OWASP recommendations for brute-force resistance).
    *   **Salts:** Unique per-user `auth_salt` and `ek_salt`.

2.  **Envelope Encryption (Master Key + DEK):**
    *   Each document is encrypted with a unique **Data Encryption Key (DEK)**.
    *   The DEK is wrapped (encrypted) using a **Wrapping Key** derived from the user's **Master Key** using **HKDF (HMAC-based Key Derivation Function)**.
    *   This ensures that the Master Key is never used directly to encrypt data, reducing the risk of key wear-out or exposure.

## 3. Evidence of Achievement (Code References)

| Component | Logic Description | File Reference |
| :--- | :--- | :--- |
| **Document Encryption** | Implementation of AES-256-GCM and ZLIB compression. | [DocumentController.php:L429-444](file:///d:/laragon/www/stegolock/app/Http/Controllers/DocumentController.php#L429-L444) |
| **Key Wrapping** | Implementation of Envelope Encryption (wrapping the DEK). | [DocumentController.php:L415-427](file:///d:/laragon/www/stegolock/app/Http/Controllers/DocumentController.php#L415-L427) |
| **Master Key Recovery** | Recovers the Master Key during login using PBKDF2 derived keys. | [AuthenticatedSessionController.php:L45-72](file:///d:/laragon/www/stegolock/app/Http/Controllers/Auth/AuthenticatedSessionController.php#L45-L72) |
| **Key Derivation** | Secure derivation of keys using SHA-256 PBKDF2. | [RegisteredUserController.php:L44-65](file:///d:/laragon/www/stegolock/app/Http/Controllers/Auth/RegisteredUserController.php#L44-L65) |

## 4. Conclusion
Objective 1 has been **fully achieved**. The system successfully integrates AES-256-GCM for authenticated encryption and utilizes a sophisticated key management hierarchy based on PBKDF2 and HKDF, providing high-level security for document confidentiality and integrity.
