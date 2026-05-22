<?php

namespace App\Jobs;

use App\Models\Cover;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ScanCoversJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("Starting background two-phase cover scan...");

        $candidates = [];

        // --- PHASE 1: SCANNING AND VALIDATING ---
        
        // Scan audios
        $this->scan('audio', ['wav', 'mp3'], 'cover_audios', 'python_backend/embedding/audio/get_wav_embedding_capacity.py', $candidates);
        
        // Scan images
        $this->scan('image', ['png', 'jpg', 'jpeg'], 'cover_images', 'python_backend/embedding/image/check_image.py', $candidates);
        
        // Scan texts
        $this->scan('text', 'txt', 'cover_texts', 'python_backend/embedding/text/check_text.py', $candidates);

        Log::info("Phase 1 Complete: Found " . count($candidates) . " valid candidate(s).");

        if (empty($candidates)) {
            Log::info("No valid candidate covers found. Execution ended.");
            return;
        }

        // --- PHASE 2: BATCH UPLOADING AND DATABASE ENTRIES ---
        Log::info("Starting Phase 2: Batch uploading to Cloud (B2) and saving metadata to Database...");
        $this->uploadAndRegister($candidates);
        
        Log::info("Cover scan and upload completed successfully.");
    }

    /**
     * Scans a specific folder for candidate cover files.
     */
    private function scan(string $type, $extension, string $folderName, string $scriptPath, array &$candidates)
    {
        $folderPath = storage_path("app/public/{$folderName}");
        if (!file_exists($folderPath)) {
            Log::warning("Scan directory does not exist: {$folderPath}");
            return;
        }

        $files = [];
        $exts = is_array($extension) ? $extension : [$extension];
        foreach ($exts as $ext) {
            $found = glob($folderPath . "/*.{$ext}");
            if ($found) {
                $files = array_merge($files, $found);
            }
        }

        if (empty($files)) {
            return;
        }

        $candidateFolder = storage_path('app/public/candidate_covers/');
        if (!file_exists($candidateFolder)) {
            mkdir($candidateFolder, 0755, true);
        }

        $failedFolder = storage_path('app/public/failed/');
        if (!file_exists($failedFolder)) {
            mkdir($failedFolder, 0755, true);
        }

        $minCapacity = 128 * 1024; // 128 KB minimum capacity limit

        foreach ($files as $filePath) {
            try {
                $contents = file_get_contents($filePath);
                if ($contents === false) {
                    throw new \Exception("Could not read file contents.");
                }

                $hash = hash('sha256', $contents);

                // Deduplication check
                if (Cover::where('hash', $hash)->exists()) {
                    Log::info("Deduplication: Cover with hash already exists, skipping: " . basename($filePath));
                    unlink($filePath);
                    continue;
                }

                // Check capacity via Python scripts
                $command = config('app.python_binary', 'python') . " " . base_path($scriptPath) . " " . escapeshellarg($filePath) . " 2>&1";
                Log::info("Running capacity script: type={$type} file=" . basename($filePath));
                $output = [];
                $status = 0;
                exec($command, $output, $status);

                if ($status !== 0 || empty($output)) {
                    Log::error("Script failure for " . basename($filePath) . " (Status {$status}): " . implode("\n", $output));
                    rename($filePath, $failedFolder . basename($filePath));
                    continue;
                }

                $outputStr = trim(implode("\n", $output));
                $parts = explode(',', $outputStr);
                if (count($parts) < 2) {
                    Log::error("Invalid script output for " . basename($filePath) . ": {$outputStr}");
                    rename($filePath, $failedFolder . basename($filePath));
                    continue;
                }

                $usableBytes = (int) $parts[0];
                $totalBytes = (int) $parts[1];

                Log::info("Cover capacity check: " . basename($filePath) . " | usable={$usableBytes} bytes | total={$totalBytes} bytes | min={$minCapacity} bytes");

                if ($usableBytes >= $minCapacity) {
                    // Passed capacity check: move to candidate folder
                    $extension = pathinfo($filePath, PATHINFO_EXTENSION);
                    $randomHex = bin2hex(random_bytes(16));
                    $newFilename = "{$randomHex}_cover_" . time() . ".{$extension}";
                    $newFilePath = $candidateFolder . $newFilename;

                    if (rename($filePath, $newFilePath)) {
                        $candidates[] = [
                            'type' => $type,
                            'local_path' => $newFilePath,
                            'filename' => $newFilename,
                            'hash' => $hash,
                            'usable_bytes' => $usableBytes,
                            'total_bytes' => $totalBytes
                        ];
                        Log::info("Passed check: Moved " . basename($filePath) . " to candidate_covers as {$newFilename}");
                    } else {
                        Log::error("Could not move file to candidate_covers: " . basename($filePath));
                    }
                } else {
                    // Failed capacity: move to failed folder
                    rename($filePath, $failedFolder . basename($filePath));
                    Log::info("Moved invalid cover file (low capacity) to failed folder: " . basename($filePath));
                }

            } catch (\Exception $e) {
                Log::error("Failed to process cover file " . basename($filePath) . ": " . $e->getMessage());
            }
        }
    }

    /**
     * Phase 2: Uploads valid candidate files in a batch loop to B2 and registers them in the database.
     */
    private function uploadAndRegister(array $candidates)
    {
        $prefixMap = [
            'audio' => 'cover_audios',
            'image' => 'cover_images',
            'text' => 'cover_texts'
        ];

        foreach ($candidates as $candidate) {
            $filePath = $candidate['local_path'];
            try {
                Log::info("Uploading cover to B2 Cloud: {$candidate['filename']}");
                
                $b2Service = new \App\Providers\B2Service();
                $upload = $b2Service->getUploadUrl();
                
                $b2FileName = $prefixMap[$candidate['type']] . '/' . $candidate['filename'];
                $sha1 = sha1_file($filePath);

                $client = new \GuzzleHttp\Client(['timeout' => 0]);
                $response = $client->request('POST', $upload['uploadUrl'], [
                    'headers' => [
                        'Authorization' => $upload['authorizationToken'],
                        'X-Bz-File-Name' => $b2FileName,
                        'Content-Type' => 'b2/x-auto',
                        'X-Bz-Content-Sha1' => $sha1,
                    ],
                    'body' => fopen($filePath, 'r'),
                ]);

                $b2Data = json_decode($response->getBody(), true);

                if (isset($b2Data['fileId'])) {
                    // Record in database
                    Cover::create([
                        'cover_id' => (string) Str::uuid(),
                        'type' => $candidate['type'],
                        'filename' => $candidate['filename'],
                        'path' => $b2FileName,
                        'size_bytes' => filesize($filePath),
                        'total_embedding_capacity' => $candidate['total_bytes'],
                        'metadata' => [
                            'valid' => true,
                            'capacity' => $candidate['usable_bytes'],
                            'b2_file_id' => $b2Data['fileId'],
                            'cloud_synced' => true
                        ],
                        'hash' => $candidate['hash'],
                    ]);

                    // File is NOT deleted locally from candidate_covers per user requirement
                    Log::info("Successfully synced cover to B2 and Database: {$candidate['filename']} (B2 File ID: {$b2Data['fileId']})");
                } else {
                    Log::error("B2 did not return a valid file ID for {$candidate['filename']}");
                }

            } catch (\Exception $e) {
                Log::error("B2 Cloud upload failed for {$candidate['filename']}: " . $e->getMessage());
            }
        }
    }
}
