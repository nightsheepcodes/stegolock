<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProcessMetric extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'document_id',
        'user_id',
        'job_id',
        'job_type',
        'step',
        'duration_ms',
        'started_at',
        'completed_at',
        'metadata',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'duration_ms' => 'float',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'metadata' => 'array',
    ];

    /**
     * Relationship with the document.
     */
    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class, 'document_id', 'document_id');
    }

    /**
     * Relationship with the user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
