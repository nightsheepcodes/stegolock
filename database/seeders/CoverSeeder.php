<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CoverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cachePath = storage_path('app/private/cache/covers');

        if (!file_exists($cachePath)) {
            $this->command->warn("Cache directory not found: {$cachePath}");
            return;
        }

        $files = glob($cachePath . '/*.*');

        if (empty($files)) {
            $this->command->warn("No files found in: {$cachePath}");
            return;
        }

        // Truncate existing records to allow a clean fresh import with capacities and metadata
        DB::table('covers')->truncate();

        $this->command->info("Found " . count($files) . " files in cache. Populating covers table with embedding capacity and metadata...");

        $inserted = 0;

        foreach ($files as $filePath) {
            $filename = basename($filePath);
            $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

            // Determine type, folder, and capacity script based on extension
            if (in_array($extension, ['png'])) {
                $type = 'image';
                $folder = 'cover_images';
                $scriptPath = 'python_backend/embedding/image/check_image.py';
            } elseif (in_array($extension, ['wav'])) {
                $type = 'audio';
                $folder = 'cover_audios';
                $scriptPath = 'python_backend/embedding/audio/get_wav_embedding_capacity.py';
            } elseif ($extension === 'txt') {
                $type = 'text';
                $folder = 'cover_texts';
                $scriptPath = 'python_backend/embedding/text/check_text.py';
            } else {
                continue; // Skip unknown file types
            }

            $sizeBytes = filesize($filePath);
            $hash = hash_file('sha256', $filePath);

            // Execute Python capacity script
            $command = config('app.python_binary', 'python') . " " . base_path($scriptPath) . " " . escapeshellarg($filePath) . " 2>&1";
            $output = [];
            $status = 0;
            exec($command, $output, $status);

            if ($status !== 0 || empty($output)) {
                $this->command->error("Script failure for " . basename($filePath) . " (Status {$status})");
                continue;
            }

            $outputStr = trim(implode("\n", $output));
            $parts = explode(',', $outputStr);
            if (count($parts) < 2) {
                $this->command->error("Invalid script output for " . basename($filePath) . ": {$outputStr}");
                continue;
            }

            $usableBytes = (int) $parts[0];
            $totalEmbeddingCapacity = (int) $parts[1];

            // Build metadata payload (capacity excludes delimiter offset)
            $metadata = json_encode([
                'valid' => true,
                'capacity' => $usableBytes
            ]);

            DB::table('covers')->insert([
                'cover_id'                 => (string) Str::uuid(),
                'filename'                 => $filename,
                'path'                     => "{$folder}/{$filename}",
                'type'                     => $type,
                'size_bytes'               => $sizeBytes,
                'total_embedding_capacity' => $totalEmbeddingCapacity,
                'metadata'                 => $metadata,
                'hash'                     => $hash,
                'created_at'               => now(),
                'updated_at'               => now(),
            ]);

            $inserted++;
        }

        $this->command->info("Successfully inserted {$inserted} covers with capacity and metadata.");
    }
}
