<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TwoFactorChallengeController extends Controller
{
    /**
     * Show the Two-Factor Authentication challenge screen.
     */
    public function create(Request $request): RedirectResponse|Response|\Symfony\Component\HttpFoundation\Response
    {
        $userId = session('2fa:user_id');
        $token = session('2fa:master_key_token');

        if (!$userId || !$token) {
            return redirect()->route('login');
        }

        $user = User::find($userId);
        if (!$user) {
            return redirect()->route('login');
        }

        // Retrieve the active OTP expiration details to sync the frontend timer
        $otp = $user->loginOtp()->first();
        $timeLeft = 0;
        if ($otp) {
            $timeLeft = (int) max(0, now()->diffInSeconds($otp->expires_at, false));
        }

        return Inertia::render('Auth/TwoFactorChallenge', [
            'email' => $user->email,
            'timeLeft' => $timeLeft,
            'status' => session('status'),
        ]);
    }

    /**
     * Verify the Two-Factor Authentication OTP code.
     */
    public function store(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        $userId = session('2fa:user_id');
        $token = session('2fa:master_key_token');

        if (!$userId || !$token) {
            return redirect()->route('login');
        }

        $user = User::find($userId);
        if (!$user) {
            return redirect()->route('login');
        }

        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $otp = $user->loginOtp;

        if (!$otp || $otp->code !== $request->code) {
            return back()->withErrors(['code' => 'The authentication code you entered is incorrect.']);
        }

        if ($otp->isExpired()) {
            return back()->withErrors(['code' => 'The authentication code has expired. Please request a new one.']);
        }

        // 🌟 OTP verified! Establish active secure session
        session(['master_key_token' => $token]);
        
        $remember = session('2fa:remember', false);
        $redirectTo = session('2fa:redirect_to');

        // Clear temporary session cache
        session()->forget([
            '2fa:user_id',
            '2fa:master_key_token',
            '2fa:remember',
            '2fa:redirect_to',
            'master_key',
            'master_key_expires_at'
        ]);

        // Delete used OTP
        $otp->delete();

        // Regenerate main session (session fixation protection)
        $request->session()->regenerate();

        // Login user
        Auth::login($user, $remember);

        // Flash success toast notification message
        session()->flash('success', 'Logged in successfully! Welcome back to StegoLock.');

        // Support AJAX/Axios success loading delays for premium UX
        if ($request->wantsJson()) {
            if ($redirectTo === 'survey') {
                $redirectUrl = route('survey', absolute: false);
            } else {
                $redirectUrl = $user->isUserAdmin() || $user->isDbStorageAdmin() || $user->isSuperadmin()
                    ? route('admin.dashboard', absolute: false)
                    : route('myDocuments', absolute: false);
            }

            return response()->json([
                'success' => true,
                'redirect' => $redirectUrl,
            ]);
        }

        // Standard fallback redirect
        if ($redirectTo === 'survey') {
            return redirect()->route('survey');
        }

        $redirectRoute = $user->isUserAdmin() || $user->isDbStorageAdmin() || $user->isSuperadmin()
            ? 'admin.dashboard'
            : 'myDocuments';

        return redirect()->intended(route($redirectRoute, absolute: false));
    }

    /**
     * Resend a fresh Login 2FA OTP code.
     */
    public function resend(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        $userId = session('2fa:user_id');
        if (!$userId) {
            return redirect()->route('login');
        }

        $user = User::find($userId);
        if (!$user) {
            return redirect()->route('login');
        }

        // Generate and send a fresh login 2FA OTP
        $user->sendLogin2faNotification();

        return back()->with('status', 'verification-code-sent');
    }
}
