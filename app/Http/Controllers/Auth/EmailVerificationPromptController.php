<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        $user = $request->user();
        
        if ($user->hasVerifiedEmail()) {
            $redirectRoute = $user->isUserAdmin() || $user->isDbStorageAdmin() || $user->isSuperadmin() 
                ? 'admin.dashboard' 
                : 'myDocuments';
            return redirect()->intended(route($redirectRoute, absolute: false));
        }

        // Generate and send an OTP if no active, unexpired one exists yet
        $hasActiveOtp = $user->emailOtp()->where('expires_at', '>', now())->exists();
        if (!$hasActiveOtp) {
            $user->sendEmailVerificationNotification();
            session()->flash('status', 'verification-link-sent'); // Re-use status key to notify they have a new email
        }

        $otp = $user->emailOtp()->first();
        $timeLeft = 0;
        if ($otp) {
            $timeLeft = (int) max(0, now()->diffInSeconds($otp->expires_at, false));
        }
        
        return Inertia::render('Auth/VerifyEmail', [
            'status' => session('status'),
            'timeLeft' => $timeLeft,
        ]);
    }
}
