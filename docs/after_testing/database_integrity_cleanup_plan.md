# Implementation Plan - Database Integrity & Ghost Cleanup

This plan addresses the discrepancy between cloud storage and database records by implementing a "Triple-Check" diagnostic utility and fixing the `ProcessSteganoJob` logic to prevent future "Ghost" files.

## User Review Required

> [!IMPORTANT]
> The **Ghost Cleanup** will physically delete files from Backblaze B2. While these files are "ghosts" (unreachable by the DB), this action is irreversible. I will implement a "Dry Run/Audit" phase first so you can see exactly what will be deleted before confirming.

> [!WARNING]
> The `ProcessSteganoJob` fix will now involve cloud API calls during the "Idempotency Cleanup" phase. This might slightly increase the time it takes for a failed job to restart, but it ensures storage remains clean.

## Proposed Changes

---

### 1. Database & Admin Backend

#### [MODIFY] [SystemManagementController.php](file:///d:/laragon/www/stegolock/app/Http/Controllers/Admin/SystemManagementController.php)
- **New Method `auditIntegrity()`**:
    1. **Fetch Cloud State**: List all files in B2 with the `locked/` prefix.
    2. **Fetch DB State**: Get all `StegoFile` records and `Document` metadata.
    3. **The "Back-to-Back" Check**:
        - **Ghost Identification**: Find B2 files that have NO entry in `stego_files`.
        - **Corrupted Doc Identification**: Find Documents where `fragment_count` != `count(fragments)` OR `count(stego_files)`.
        - **Orphan Identification**: Find `stego_files` records where the B2 file is missing (already partially implemented, but will be unified).
- **New Method `purgeGhosts()`**:
    - Takes the list of identified "Ghost" files and calls `B2Service` to delete them.

#### [MODIFY] [Database.jsx](file:///d:/laragon/www/stegolock/resources/js/Pages/Admin/Database.jsx)
- Add a **"System Audit"** section.
- Add an interactive table showing the "Back-to-Back" results:
    - **Ghosts Table**: List of files in B2 that are safe to purge.
    - **Mismatched Documents**: Highlighting documents with inconsistent fragment counts.
- Add "Run Audit" and "Purge Ghost Storage" buttons with confirmation modals.

---

### 2. Stegano Job Logic Fix

#### [MODIFY] [ProcessSteganoJob.php](file:///d:/laragon/www/stegolock/app/Jobs/ProcessSteganoJob.php)
- **Refactor Step 0 (Idempotency Cleanup)**:
    - Currently, it only deletes DB records of failed attempts.
    - **Change**: Before deleting the `StegoFile` records, it will now fetch their `cloud_file_id` and call `B2Service::deleteFile()` for each.
    - This ensures that if a job is retried, the fragments from the *failed* attempt are wiped from the cloud before the *new* attempt begins.

---

### 3. Cloud Service Enhancement

#### [MODIFY] [B2Service.php](file:///d:/laragon/www/stegolock/app/Providers/B2Service.php)
- **Add `deleteFilesBatch()`**:
    - To make the cleanup faster, I'll add a helper to delete multiple files in parallel using Guzzle's Pool, similar to how I implemented `storeFilesBatch`.

## Verification Plan

### Automated/Manual Tests
1. **Trigger a Ghost**: I will manually interrupt a locking process to create "ghost" files in B2 and "mismatched" counts in the DB.
2. **Run Audit**: Verify the Database page correctly identifies exactly how many ghost files exist and which documents are mismatched.
3. **Run Purge**: Verify the ghost files are deleted from B2 and the "Real-time Cloud Stats" now match the "Database Stats."
4. **Retry Test**: Run a locking job, force it to fail, let it retry, and verify that NO ghost files are left behind.
