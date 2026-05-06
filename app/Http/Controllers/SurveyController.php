<?php

namespace App\Http\Controllers;

use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SurveyController extends Controller
{
    /**
     * Display the survey form.
     */
    public function index()
    {
        return Inertia::render('Survey');
    }

    /**
     * Store a newly created survey response in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'experience_rating' => 'nullable|integer|min:1|max:5',
            'ease_of_use_rating' => 'nullable|integer|min:1|max:5',
            'security_confidence_rating' => 'nullable|integer|min:1|max:5',
            'features_used' => 'nullable|string',
            'improvements_suggested' => 'nullable|string',
            'additional_comments' => 'nullable|string',
            'would_recommend' => 'nullable|boolean',
        ]);

        // Add authenticated user's info
        $validated['name'] = $request->user()->name;
        $validated['email'] = $request->user()->email;

        SurveyResponse::create($validated);

        return redirect()->back()->with('success', 'Thank you for your feedback!');
    }
}
