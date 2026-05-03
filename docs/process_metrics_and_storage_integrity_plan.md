# Implementation Plan - Process Metrics & Storage Integrity

This plan outlines a systematic, phased update to Stegolock's document processing pipeline. It aims to provide deep visibility into performance (metrics), high-fidelity debugging (isolated logging), and system stability (garbage collection).

## User Review Required

> [!IMPORTANT]
> - **Option 1 (Dedicated Table)**: We will use a `process_metrics` table.
> - **Shared Process ID**: To link the initial Upload/Encryption in the controller to the subsequent background Job, I will generate a `process_uuid` at the start of the request and pass it through the pipeline.
> - **Isolated Logging**: Each process will have its own `.log` file.
> - **Garbage Collection**: A new scheduled command will purge "zombie" temp files left behind by failed or crashed jobs.

## Phase 0: Shared Infrastructure
*Goal: Create reusable tools for instrumentation.*

### [Component] Backend Utilities
#### [NEW] [RecordsMetrics trait](file:///d:/laragon/www/stegolock/app/Traits/RecordsMetrics.php)
- A trait for Controllers and Jobs to handle `startMetric()` and `finishMetric()` logic consistently.
- Uses `microtime(true)` to ensure millisecond precision for all process durations.
- Handles both database insertion and isolated logging automatically.

### [Component] API Routes
#### [MODIFY] [routes/web.php](file:///d:/laragon/www/stegolock/routes/web.php)
- Add `GET /documents/metrics/{document}` endpoint to serve timing data to the frontend.

---

## Phase 1: Foundation & Data Model
*Goal: Prepare the database and directory structures.*

### [Component] Database
#### [NEW] [process_metrics migration](file:///d:/laragon/www/stegolock/database/migrations/2026_04_30_074400_create_process_metrics_table.php)
- Columns: `id`, `document_id`, `user_id`, `job_id` (UUID), `job_type`, `step`, `duration_ms`, `started_at`, `completed_at`, `metadata`.
#### [NEW] [ProcessMetric model](file:///d:/laragon/www/stegolock/app/Models/ProcessMetric.php)

### [Component] Filesystem
- Initialize `storage/logs/jobs/` directory.

---

## Phase 2: Locking Instrumentation
*Goal: Track and log the "Lock a File" workflow.*

### [Component] DocumentController
- **Instrument `upload`**: Measure and log time from request start to storage.
- **Instrument `lock`**: Measure and log **Encryption** (Symmetric AES-GCM + Wrapping).

### [Component] ProcessSteganoJob
- **Isolated Logger**: Initialize `Log::build()` at the start of `handle()`.
- **Instrument `splitDocument`**: Track Segmentation duration.
- **Instrument `embedDocument`**: Track total Embedding and Cloud Storing duration.
- **Detailed Step Logging**: Log start/end of each fragment embedding (including Python script outputs).

---

## Phase 3: Unlocking Instrumentation
*Goal: Track and log the "Unlock File" workflow.*

### [Component] ProcessUnlockJob
- **Isolated Logger**: Initialize per-job logger.
- **Instrument `fetchStegoFilesBatch`**: Track Cloud Retrieval duration.
- **Instrument `extractFragmentsBatch`**: Track Python extraction duration.
- **Instrument `assembleStreaming`**: Track Assembly duration.
- **Instrument `decrypt`**: Track final Decryption duration.

---

## Phase 4: Storage Integrity & Maintenance
*Goal: Prevent storage leakage and ensure clean job exits.*

### [Component] Job Cleanup Updates
- Replace custom `safeDeleteFolder` with `Illuminate\Support\Facades\File::deleteDirectory()` for atomic and robust deletion.
- Log cleanup results (files deleted, space reclaimed) into the isolated job log.

### [Component] Garbage Collection
#### [NEW] [CleanupZombieJobs command](file:///d:/laragon/www/stegolock/app/Console/Commands/CleanupZombieJobs.php)
- Scans `storage/app/private/temp/jobs/` for old directories.
- Scans `storage/logs/jobs/` for old `.log` files.
- Deletes any folder or log file older than 6 hours (configurable).
#### [MODIFY] [routes/console.php](file:///d:/laragon/www/stegolock/routes/console.php)
- Schedule the cleanup command to run hourly.

---

## Phase 5: Frontend Presentation
*Goal: Visualize the metrics for the user.*

### [Component] FileInfoModal
- Add a "Process Performance" table.
- Display steps (e.g., "Encryption", "Embedding") alongside their durations in milliseconds.
- Display total processing time for the job.

---

## Verification Plan

### Automated Tests
- Run `php artisan app:cleanup-zombie-jobs` with dummy files to verify garbage collection.
- Process a 5MB file and verify all steps are recorded in `process_metrics` and the isolated log file exists.

### Manual Verification
- Check `storage/logs/jobs/` after multiple concurrent uploads to ensure logs are isolated.
- Open the "File History" UI and verify the timing table is populated.
