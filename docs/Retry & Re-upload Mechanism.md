# Implementation Plan - Retry & Re-upload Mechanism

Improve the reliability of document operations (upload, lock, unlock) by implementing automatic retries for transient failures and providing manual retry options for persistent errors.

## User Review Required

> [!IMPORTANT]
> The "Retry" button on the document card will be most effective for **Unlocking** operations. For **Locking** operations that fail after background processing has started, a "Retry" might require re-uploading the file if the temporary data was already cleaned up.

## Proposed Changes

### [NEW] [retry.js](file:///d:/laragon/www/stegolock/resources/js/Utils/retry.js)
Create a utility to handle asynchronous retries with exponential backoff.

### [MODIFY] [UploadModal.jsx](file:///d:/laragon/www/stegolock/resources/js/Components/modals/UploadModal.jsx)
- Implement automatic retries for `upload` and `lock` requests.
- Prevent modal closure upon failure to allow manual retries.
- Add UI indicators for current retry attempts.
- Add a "Retry Manually" button if automatic retries fail.

### [MODIFY] [useDocumentActions.js](file:///d:/laragon/www/stegolock/resources/js/hooks/useDocumentActions.js)
- Update `handleUnlock` to use the automatic retry utility.
- Ensure document status is updated to `failed` on persistent errors to enable the manual retry UI.

### [MODIFY] [DocumentCard.jsx](file:///d:/laragon/www/stegolock/resources/js/Components/DocumentCard.jsx)
- Add a visible "Retry" button when a document's status is `failed`.
- Ensure this button triggers the appropriate action (e.g., `handleUnlock`).

### [MODIFY] [DocumentController.php](file:///d:/laragon/www/stegolock/app/Http/Controllers/DocumentController.php)
- (Optional) Ensure idempotency for the `lock` and `unlock` endpoints where possible to avoid side effects during retries.

## Verification Plan

### Automated Tests
- Use `browser_subagent` to simulate network failures (e.g., intercepting requests and returning 500) and verify that the "Retrying..." UI appears and eventually the "Retry Manually" button shows up.

### Manual Verification
- Manually trigger an upload and temporarily disconnect internet to verify retry logic.
- Verify that the "Retry" button on the `DocumentCard` correctly re-triggers the unlocking process.
