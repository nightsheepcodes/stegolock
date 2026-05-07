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
        // Build validation rules dynamically for PE, US, RE, SC fields
        $rules = [];
        $peFields = ['pe1', 'pe2', 'pe3', 'pe4', 'pe5', 'pe6', 'pe7'];
        $usFields = ['us1', 'us2', 'us3', 'us4', 'us5', 'us6', 'us7', 'us8', 'us9'];
        $reFields = ['re1', 're2', 're3', 're4', 're5', 're6'];
        $scFields = ['sc1', 'sc2', 'sc3', 'sc4', 'sc5'];

        foreach (array_merge($peFields, $usFields, $reFields, $scFields) as $field) {
            $rules[$field] = 'nullable|integer|min:1|max:5';
        }
        $rules['additional_comments'] = 'nullable|string';

        $validated = $request->validate($rules);

        // Add authenticated user's info
        $validated['name'] = $request->user()->name;
        $validated['email'] = $request->user()->email;

        SurveyResponse::create($validated);

        return redirect()->back()->with('success', 'Thank you for your feedback!');
    }
}
