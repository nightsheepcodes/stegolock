<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TourController extends Controller
{
    /**
     * Mark the evaluation tour as completed for the current user.
     */
    public function complete(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        $user->update([
            'tour_completed_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tour completed successfully',
            'tour_completed_at' => $user->tour_completed_at
        ]);
    }

    /**
     * Verify if the user has performed the action for a specific tour step.
     */
    public function verify(Request $request)
    {
        $user = Auth::user();
        if (!$user) return response()->json(['isVerified' => false], 401);

        $step = (int) $request->input('step');
        $isVerified = false;

        switch ($step) {
            case 0: // Speed Test (Lock 1)
                $isVerified = \App\Models\Document::where('user_id', $user->id)->exists();
                break;
            case 1: // Double Duty (Lock 2)
                $isVerified = \App\Models\Document::where('user_id', $user->id)->count() >= 2;
                break;
            case 2: // Magic Trick (Unlock)
                // Check for activity OR decrypted status
                $isVerified = \App\Models\DocumentActivity::where('user_id', $user->id)->where('action', 'unlocked')->exists() 
                           || \App\Models\Document::where('user_id', $user->id)->whereIn('status', ['decrypted', 'retrieved'])->exists();
                break;
            case 3: // Sharing is Caring (Share)
                $isVerified = \App\Models\DocumentShare::where('sender_id', $user->id)->exists();
                break;
            case 4: // Clean Up (Delete)
                $isVerified = \App\Models\DocumentActivity::where('user_id', $user->id)->where('action', 'deleted')->exists();
                break;
            case 5: // See You Later (Login)
                $isVerified = $user->last_logout_at !== null;
                break;
        }

        return response()->json(['isVerified' => $isVerified]);
    }
}
