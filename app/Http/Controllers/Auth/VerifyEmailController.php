<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(\Illuminate\Http\Request $request): \Symfony\Component\HttpFoundation\Response
    {
        $user = $request->user();
        
        $redirectRoute = $user->isUserAdmin() || $user->isDbStorageAdmin() || $user->isSuperadmin() 
            ? route('admin.dashboard', absolute: false) 
            : route('myDocuments', absolute: false);
        
        if ($user->hasVerifiedEmail()) {
            return redirect()->intended($redirectRoute . '?verified=1');
        }

        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $otp = $user->emailOtp;

        if (!$otp || $otp->code !== $request->code) {
            return back()->withErrors(['code' => 'The code you entered is incorrect.']);
        }

        if ($otp->isExpired()) {
            return back()->withErrors(['code' => 'The verification code has expired. Please request a new one.']);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        // Delete the used OTP code
        $otp->delete();

        // Flash success message for the frontend toast notification (fallback/regular navigation)
        session()->flash('success', 'Email verified successfully! Welcome to StegoLock.');

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'redirect' => $redirectRoute . '?verified=1'
            ]);
        }

        return redirect()->intended($redirectRoute . '?verified=1');
    }
}
