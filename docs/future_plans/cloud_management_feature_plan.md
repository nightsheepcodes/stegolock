# StegoLock Cloud Management Feature Plan

## 1. Objective
To build a robust "Cloud Management" interface within the StegoLock Admin UI that allows administrators to seamlessly manage multiple Backblaze B2 accounts, switch active production buckets, and perform high-speed data transfers and synchronizations using `rclone` under the hood.

## 2. Infrastructure & Tooling
*   **Core Engine:** `rclone` (installed via Railway Dockerfile).
*   **Execution:** Laravel Queued Jobs utilizing the `Process` facade to run rclone commands without blocking the web server.
*   **Frontend:** React/Inertia (`CloudManagement.jsx`).

## 3. Architecture & Data Storage (Action Required)

### The `.env` Dilemma
The initial request specified saving new cloud accounts to the `.env` file. 
*   **The Problem:** On modern cloud hosts like Railway, the `.env` file is ephemeral. If PHP modifies `.env`, those changes will be wiped out on the next deployment or container restart. Furthermore, modifying Railway's environment variables programmatically requires hitting their API and usually triggers a full redeploy, taking the app offline momentarily.
*   **The Solution (Proposed):** Store cloud accounts securely in a new database table (`cloud_accounts`). We can use Laravel's `Crypt` facade to encrypt the `Application Key` so it is secure at rest. 

## 4. Feature Breakdown & Implementation Steps

### A. Cloud Accounts View
*   **Backend:** Create a `CloudAccount` model/migration. Fields: `name`, `b2_key_id`, `b2_application_key` (encrypted), `bucket_name`, `is_active`.
*   **UI:** A data table listing all connected accounts.
*   **Function:** "Add Cloud Account" form. Validates credentials by doing a quick test ping to B2 before saving.

### B. Cloud Account Switching
*   **Backend:** A controller method to mark one account as `is_active = true` and all others as `false`.
*   **Integration:** Update `B2Service.php` to fetch credentials from the active `CloudAccount` database record rather than `config('services.b2')`, falling back to `.env` if the database is empty.
*   **UI:** A prominent "Current Active Account" banner and "Set Active" buttons on the accounts list.

### C. Cloud Files Transfer & Sync Interface
*   **UI:** A dedicated section with:
    *   **Source:** Dropdown (or default to current active).
    *   **Destination:** Dropdown of other saved accounts.
    *   **Action:** Toggle between `Transfer (Copy only)` and `Sync (Mirror/Delete)`.
*   **Backend execution:** 
    *   Dispatch `RcloneTransferJob`.
    *   The Job dynamically constructs the `rclone` command using environment variables passed directly to the shell process (so we don't have to write plain-text config files to the server).
    *   `Process::env(['RCLONE_CONFIG_SRC_...'])`

### D. Real-Time Status & Monitoring
*   **Mechanism:** When a job is running, it outputs its progress to a log file or a cache key.
*   **UI:** The frontend polls a `/api/admin/cloud/status` endpoint every 3 seconds to get the latest `rclone` output, displaying a progress bar and terminal-like logs.

## 5. Required File Changes
1.  **Migrations:** `create_cloud_accounts_table.php`
2.  **Models:** `CloudAccount.php`
3.  **Controllers:** `Admin/CloudManagementController.php`
4.  **Jobs:** `ExecuteRcloneTask.php`
5.  **Services:** Update `B2Service.php` to be database-aware.
6.  **Frontend:** `resources/js/Pages/Admin/CloudManagement.jsx`
7.  **Dockerfile:** Add `rclone` installation block.
