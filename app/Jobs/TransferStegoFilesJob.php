<?php

namespace App\Jobs;

use App\Models\CloudAccount;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Log;

class TransferStegoFilesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $timeout = 3600; // 1 hour

    protected $targetAccountId;

    /**
     * Create a new job instance.
     */
    public function __construct($targetAccountId)
    {
        $this->targetAccountId = $targetAccountId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $target = CloudAccount::findOrFail($this->targetAccountId);
            
            // Credentials for Source (Current Active B2 from .env/config)
            $srcKeyId = config('services.b2.key_id');
            $srcKey = config('services.b2.application_key');
            $srcBucket = config('services.b2.bucket_name');

            // Credentials for Target
            $destKeyId = $target->key_id;
            $destKey = $target->application_key;
            $destBucket = $target->bucket_name;

            Log::info("Starting Stego File Transfer to {$target->name}");

            // Use rclone environment variables to configure remotes on the fly
            $env = [
                'RCLONE_CONFIG_SRC_TYPE' => 'b2',
                'RCLONE_CONFIG_SRC_ACCOUNT' => $srcKeyId,
                'RCLONE_CONFIG_SRC_KEY' => $srcKey,
                
                'RCLONE_CONFIG_DEST_TYPE' => 'b2',
                'RCLONE_CONFIG_DEST_ACCOUNT' => $destKeyId,
                'RCLONE_CONFIG_DEST_KEY' => $destKey,
            ];

            // Command: rclone copy src:bucket/locked/ dest:bucket/locked/
            $command = "rclone copy src:{$srcBucket}/locked/ dest:{$destBucket}/locked/ --progress";

            $process = Process::env($env)
                ->timeout($this->timeout)
                ->run($command);

            if ($process->successful()) {
                Log::info("Stego File Transfer to {$target->name} completed successfully.");
                Log::debug($process->output());
            } else {
                Log::error("Stego File Transfer to {$target->name} failed.");
                Log::error($process->errorOutput());
            }
        } finally {
            \Illuminate\Support\Facades\Cache::forget('stego_transfer_status');
        }
    }
}
