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
        'experience_rating',
        'ease_of_use_rating',
        'security_confidence_rating',
        'features_used',
        'improvements_suggested',
        'additional_comments',
        'would_recommend',
    ];
    
    // Name and email are set manually from auth user in controller

    protected $casts = [
        'would_recommend' => 'boolean',
    ];
}
