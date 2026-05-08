<?php

namespace App\Http\Controllers;

use App\Models\SurveyResponse;
use App\Models\SurveyQuestion;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SurveyController extends Controller
{
    /**
     * Display the survey form.
     */
    public function index()
    {
        $questions = SurveyQuestion::orderBy('order')->get()->groupBy('category');
        
        return Inertia::render('Survey', [
            'questions' => $questions,
            'user' => auth()->user()
        ]);
    }

    /**
     * Store a newly created survey response in storage.
     */
    public function store(Request $request)
    {
        $questions = SurveyQuestion::all();
        
        // Build validation rules for all question codes
        $rules = [
            'respondent_name' => 'nullable|string|max:255',
            'respondent_email' => 'nullable|email|max:255',
            'respondent_role' => 'required|string|max:255',
            'internet_access' => 'required|string|max:255',
            'additional_comments' => 'nullable|string',
        ];
        
        foreach ($questions as $question) {
            $rules[strtolower($question->code)] = 'required|integer|min:1|max:5';
        }

        $validated = $request->validate($rules);

        DB::transaction(function () use ($request, $questions, $validated) {
            $response = SurveyResponse::create([
                'user_id' => $request->user()->id,
                'respondent_name' => $validated['respondent_name'] ?? null,
                'respondent_email' => $validated['respondent_email'] ?? null,
                'respondent_role' => $validated['respondent_role'],
                'internet_access' => $validated['internet_access'],
                'additional_comments' => $validated['additional_comments'] ?? null,
            ]);

            foreach ($questions as $question) {
                $field = strtolower($question->code);
                SurveyAnswer::create([
                    'survey_response_id' => $response->id,
                    'survey_question_id' => $question->id,
                    'rating' => $validated[$field],
                ]);
            }
        });

        return redirect()->back()->with('success', 'Thank you for your feedback!');
    }
}
