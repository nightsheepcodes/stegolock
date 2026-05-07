<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SurveyResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        // Performance Efficiency (PE1-PE7)
        'pe1', 'pe2', 'pe3', 'pe4', 'pe5', 'pe6', 'pe7',
        // Usability (US1-US9)
        'us1', 'us2', 'us3', 'us4', 'us5', 'us6', 'us7', 'us8', 'us9',
        // Reliability (RE1-RE6)
        're1', 're2', 're3', 're4', 're5', 're6',
        // Security (SC1-SC5)
        'sc1', 'sc2', 'sc3', 'sc4', 'sc5',
        'additional_comments',
    ];
    
    // Name and email are set manually from auth user in controller

    protected $casts = [
        'pe1' => 'integer', 'pe2' => 'integer', 'pe3' => 'integer', 'pe4' => 'integer',
        'pe5' => 'integer', 'pe6' => 'integer', 'pe7' => 'integer',
        'us1' => 'integer', 'us2' => 'integer', 'us3' => 'integer', 'us4' => 'integer',
        'us5' => 'integer', 'us6' => 'integer', 'us7' => 'integer', 'us8' => 'integer',
        'us9' => 'integer',
        're1' => 'integer', 're2' => 'integer', 're3' => 'integer', 're4' => 'integer',
        're5' => 'integer', 're6' => 'integer',
        'sc1' => 'integer', 'sc2' => 'integer', 'sc3' => 'integer', 'sc4' => 'integer',
        'sc5' => 'integer',
    ];
}
