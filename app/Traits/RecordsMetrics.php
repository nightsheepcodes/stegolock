<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Carbon\Carbon;

trait RecordsMetrics
{
    protected array $metricStartTimes = [];
    protected ?string $isolatedLoggerChannel = null;

    /**
     * Start timing a specific step.
     * 
     * @param string $step The name of the process step being measured.
     */
    public function startMetric(string $step): void
    {
        $this->metricStartTimes[$step] = microtime(true);
    }

    /**
     * Finish timing a step and record the result to logs and database.
     * 
     * @param string $step The name of the process step.
     * @param int|null $documentId Associated document ID.
     * @param int|null $userId Associated user ID.
     * @param string|null $jobId UUID of the job/process.
     * @param string|null $jobType Type of job (e.g., 'lock', 'unlock').
     * @param array $metadata Additional context data.
     * @return mixed The created metric model instance (if Phase 1 is complete).
     */
    public function finishMetric(
        string $step,
        ?int $documentId = null,
        ?int $userId = null,
        ?string $jobId = null,
        ?string $jobType = null,
        array $metadata = []
    ) {
        if (!isset($this->metricStartTimes[$step])) {
            return null;
        }

        $endTime = microtime(true);
        $durationMs = round(($endTime - $this->metricStartTimes[$step]) * 1000, 2);
        $startedAt = Carbon::createFromTimestamp($this->metricStartTimes[$step]);
        $completedAt = Carbon::createFromTimestamp($endTime);

        // 1. Prepare Log Message
        $logMessage = "Performance Metric | Step: {$step} | Duration: {$durationMs}ms | Process: " . ($jobId ?? 'N/A');
        
        // 2. Log to isolated channel if available, otherwise default
        if ($this->isolatedLoggerChannel) {
            Log::channel($this->isolatedLoggerChannel)->info($logMessage, [
                'step' => $step,
                'duration_ms' => $durationMs,
                'metadata' => $metadata
            ]);
        } else {
            Log::info($logMessage, $metadata);
        }

        // 3. Save to database (Functionality becomes active in Phase 1)
        if (class_exists('\App\Models\ProcessMetric')) {
            try {
                return \App\Models\ProcessMetric::create([
                    'document_id' => $documentId,
                    'user_id' => $userId,
                    'job_id' => $jobId,
                    'job_type' => $jobType ?? ($jobId ? 'unknown' : 'one-off'),
                    'step' => $step,
                    'duration_ms' => $durationMs,
                    'started_at' => $startedAt,
                    'completed_at' => $completedAt,
                    'metadata' => $metadata,
                ]);
            } catch (\Exception $e) {
                Log::error("Failed to save metric to database: " . $e->getMessage());
            }
        }

        return null;
    }

    /**
     * Initialize a dedicated logger for a specific process UUID.
     * 
     * @param string $processUuid The unique identifier for the process.
     */
    public function initializeIsolatedLogger(string $processUuid): void
    {
        $logPath = storage_path("logs/jobs/{$processUuid}.log");
        
        // Ensure the directory exists
        if (!file_exists(dirname($logPath))) {
            mkdir(dirname($logPath), 0755, true);
        }

        // Dynamically register a log channel for this job
        Config::set("logging.channels.job_{$processUuid}", [
            'driver' => 'single',
            'path' => $logPath,
            'level' => 'debug',
        ]);

        $this->isolatedLoggerChannel = "job_{$processUuid}";
    }
}
