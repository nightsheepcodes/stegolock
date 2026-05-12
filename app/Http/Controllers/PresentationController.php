<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\ProcessMetric;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PresentationController extends Controller
{
    public function index()
    {
        // 1. Total Documents Locked
        $totalLocked = Document::count();

        // 2. Average Latency (Lock/Unlock) in seconds
        $avgLockTime = ProcessMetric::where('job_type', 'lock')
            ->where('step', 'total')
            ->avg('duration_ms') / 1000;
            
        $avgUnlockTime = ProcessMetric::where('job_type', 'unlock')
            ->where('step', 'total')
            ->avg('duration_ms') / 1000;

        // 3. Survey GWM (General Weighted Mean)
        $surveyGWM = SurveyAnswer::avg('rating');

        // 4. Characteristic Scores (ISO 25010)
        $characteristics = DB::table('survey_questions')
            ->join('survey_answers', 'survey_questions.id', '=', 'survey_answers.survey_question_id')
            ->select('survey_questions.category', DB::raw('AVG(survey_answers.rating) as avg_score'))
            ->groupBy('survey_questions.category')
            ->get();

        return Inertia::render('Presentation', [
            'stats' => [
                'totalLocked' => $totalLocked,
                'avgLockTime' => round($avgLockTime ?? 0, 2),
                'avgUnlockTime' => round($avgUnlockTime ?? 0, 2),
                'surveyGWM' => round($surveyGWM ?? 0, 2),
                'characteristics' => $characteristics,
            ]
        ]);
    }
}
