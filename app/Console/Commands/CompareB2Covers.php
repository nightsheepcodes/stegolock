<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class CompareB2Covers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'b2:compare-covers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Compare local cache covers with files uploaded to B2 cloud';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("Scanning local cache covers...");
        
        $localPath = storage_path('app/private/cache/covers');
        if (!File::exists($localPath)) {
            $this->error("Local covers cache directory does not exist at: {$localPath}");
            return 1;
        }

        $localFiles = File::files($localPath);
        $totalLocalCount = count($localFiles);
        $this->info("Found {$totalLocalCount} files in local cache/covers.");

        // Group local files by their target B2 directories based on extension
        $localGrouped = [
            'cover_images' => [], // .png
            'cover_audios' => [], // .wav
            'cover_texts' => []   // .txt
        ];

        foreach ($localFiles as $file) {
            $filename = $file->getFilename();
            $ext = strtolower($file->getExtension());
            
            if ($ext === 'png') {
                $localGrouped['cover_images'][$filename] = $file->getSize();
            } elseif ($ext === 'wav') {
                $localGrouped['cover_audios'][$filename] = $file->getSize();
            } elseif ($ext === 'txt') {
                $localGrouped['cover_texts'][$filename] = $file->getSize();
            } else {
                $this->warn("Skipping local file with unexpected extension: {$filename}");
            }
        }

        $this->info(sprintf(
            "Local summary: %d PNGs (images), %d WAVs (audios), %d TXTs (texts).",
            count($localGrouped['cover_images']),
            count($localGrouped['cover_audios']),
            count($localGrouped['cover_texts'])
        ));

        $this->info("Connecting to Backblaze B2 and listing remote files...");

        try {
            $b2Disk = Storage::disk('b2');
            
            $this->info("Fetching remote file list from cover_images/ ...");
            $remoteImages = $b2Disk->files('cover_images');
            
            $this->info("Fetching remote file list from cover_audios/ ...");
            $remoteAudios = $b2Disk->files('cover_audios');
            
            $this->info("Fetching remote file list from cover_texts/ ...");
            $remoteTexts = $b2Disk->files('cover_texts');
            
        } catch (\Exception $e) {
            $this->error("Failed to connect or retrieve file listing from Backblaze B2.");
            $this->error("Error: " . $e->getMessage());
            return 1;
        }

        // Helper to extract basenames from path array
        $extractBasenames = function ($paths) {
            $names = [];
            foreach ($paths as $path) {
                $names[] = basename($path);
            }
            return $names;
        };

        $b2Images = $extractBasenames($remoteImages);
        $b2Audios = $extractBasenames($remoteAudios);
        $b2Texts = $extractBasenames($remoteTexts);

        $totalRemoteCount = count($b2Images) + count($b2Audios) + count($b2Texts);
        $this->info("Found {$totalRemoteCount} files on B2 cloud.");
        $this->info(sprintf(
            "B2 cloud summary: %d images, %d audios, %d texts.",
            count($b2Images),
            count($b2Audios),
            count($b2Texts)
        ));

        // Comparison
        $uploaded = [];
        $missing = [];

        // Check images (png)
        foreach ($localGrouped['cover_images'] as $filename => $size) {
            if (in_array($filename, $b2Images)) {
                $uploaded[] = [
                    'filename' => $filename,
                    'type' => 'image',
                    'local_dir' => 'cache/covers',
                    'b2_dir' => 'cover_images'
                ];
            } else {
                $missing[] = [
                    'filename' => $filename,
                    'type' => 'image',
                    'local_dir' => 'cache/covers',
                    'b2_dir' => 'cover_images'
                ];
            }
        }

        // Check audios (wav)
        foreach ($localGrouped['cover_audios'] as $filename => $size) {
            if (in_array($filename, $b2Audios)) {
                $uploaded[] = [
                    'filename' => $filename,
                    'type' => 'audio',
                    'local_dir' => 'cache/covers',
                    'b2_dir' => 'cover_audios'
                ];
            } else {
                $missing[] = [
                    'filename' => $filename,
                    'type' => 'audio',
                    'local_dir' => 'cache/covers',
                    'b2_dir' => 'cover_audios'
                ];
            }
        }

        // Check texts (txt)
        foreach ($localGrouped['cover_texts'] as $filename => $size) {
            if (in_array($filename, $b2Texts)) {
                $uploaded[] = [
                    'filename' => $filename,
                    'type' => 'text',
                    'local_dir' => 'cache/covers',
                    'b2_dir' => 'cover_texts'
                ];
            } else {
                $missing[] = [
                    'filename' => $filename,
                    'type' => 'text',
                    'local_dir' => 'cache/covers',
                    'b2_dir' => 'cover_texts'
                ];
            }
        }

        $this->info("--------------------------------------------------");
        $this->info("Comparison results:");
        $this->info("Successfully Uploaded: " . count($uploaded) . " files.");
        $this->error("Not Yet Uploaded (Missing): " . count($missing) . " files.");
        $this->info("--------------------------------------------------");

        // Save detailed results to a JSON or markdown file so the AI/user can inspect the full lists
        $reportData = [
            'summary' => [
                'total_local' => $totalLocalCount,
                'total_uploaded' => count($uploaded),
                'total_missing' => count($missing),
                'local_breakdown' => [
                    'images' => count($localGrouped['cover_images']),
                    'audios' => count($localGrouped['cover_audios']),
                    'texts' => count($localGrouped['cover_texts']),
                ],
                'b2_breakdown' => [
                    'images' => count($b2Images),
                    'audios' => count($b2Audios),
                    'texts' => count($b2Texts),
                ]
            ],
            'uploaded' => $uploaded,
            'missing' => $missing
        ];

        $reportPath = base_path('storage/app/private/temp/b2_compare_report.json');
        File::ensureDirectoryExists(dirname($reportPath));
        File::put($reportPath, json_encode($reportData, JSON_PRETTY_PRINT));
        $this->info("Detailed comparison report written to: {$reportPath}");

        return 0;
    }
}
