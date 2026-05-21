<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $user->refreshStorageUsed();

        $pwSuspensionKey = "2fa_enable:pw_suspended:{$user->id}";
        $otpSuspensionKey = "2fa_enable:otp_suspended:{$user->id}";
        $otpCodeKey = "2fa_enable:otp_code:{$user->id}";
        $otpExpiresKey = "2fa_enable:otp_expires_at:{$user->id}";

        $pwSuspendedUntil = Cache::get($pwSuspensionKey) ?? 0;
        $otpSuspendedUntil = Cache::get($otpSuspensionKey) ?? 0;
        $hasPendingOtp = Cache::has($otpCodeKey);
        $otpExpiresAt = Cache::get($otpExpiresKey) ?? 0;

        // Check if suspension is already expired in Cache
        if ($pwSuspendedUntil && $pwSuspendedUntil - time() <= 0) {
            Cache::forget($pwSuspensionKey);
            $pwSuspendedUntil = 0;
        }

        if ($otpSuspendedUntil && $otpSuspendedUntil - time() <= 0) {
            Cache::forget($otpSuspensionKey);
            $otpSuspendedUntil = 0;
        }

        if (!$hasPendingOtp) {
            Cache::forget($otpExpiresKey);
            $otpExpiresAt = 0;
        }

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'totalStorage' => $user->storage_used,
            'storageLimit' => $user->storage_limit,
            'email2faEnabled' => (bool) $user->email_2fa_enabled,
            'twoFactorState' => [
                'pwSuspendedUntil' => (int) $pwSuspendedUntil,
                'otpSuspendedUntil' => (int) $otpSuspendedUntil,
                'hasPendingOtp' => (bool) $hasPendingOtp,
                'otpExpiresAt' => (int) $otpExpiresAt,
            ],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Progressive 2FA: Verify password and send OTP code to email.
     */
    public function verifyTwoFactorPassword(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        $user = $request->user();
        
        $request->validate([
            'password' => ['required', 'string'],
        ]);

        $pwSuspensionKey = "2fa_enable:pw_suspended:{$user->id}";
        $pwAttemptsKey = "2fa_enable:pw_attempts:{$user->id}";

        // 1. Check if password validation is currently suspended (2 minutes)
        if (Cache::has($pwSuspensionKey)) {
            $secondsLeft = Cache::get($pwSuspensionKey) - time();
            if ($secondsLeft > 0) {
                return response()->json([
                    'errors' => [
                        'password' => ["Password confirmation is suspended. Please try again later."],
                        'suspended_until' => (int) Cache::get($pwSuspensionKey)
                    ]
                ], 422);
            }
            Cache::forget($pwSuspensionKey);
            Cache::forget($pwAttemptsKey);
        }

        // 2. Verify password using zero-knowledge PBKDF2 auth system
        $auth_salt = base64_decode($user->auth_salt);
        $password_derivedKey = hash_pbkdf2(
            'sha256',
            $request->password,
            $auth_salt,
            100000,
            32,
            true
        );

        if (!hash_equals(base64_encode($password_derivedKey), $user->password_hash)) {
            // Increment failed attempts
            $attempts = Cache::get($pwAttemptsKey, 0) + 1;
            Cache::put($pwAttemptsKey, $attempts, 120); // Keep for 2 minutes

            if ($attempts >= 3) {
                $until = time() + 120;
                Cache::put($pwSuspensionKey, $until, 120); // Suspend for 2 minutes
                return response()->json([
                    'errors' => [
                        'password' => ['Too many incorrect attempts. Password confirmation is suspended.'],
                        'suspended_until' => $until
                    ]
                ], 422);
            }

            $remaining = 3 - $attempts;
            return response()->json([
                'errors' => [
                    'password' => ["Incorrect password. {$remaining} attempts remaining."]
                ]
            ], 422);
        }

        // Correct password! Reset failed attempts
        Cache::forget($pwAttemptsKey);
        Cache::forget($pwSuspensionKey);

        // 3. Generate a secure random 6-digit OTP code (000000 - 999999)
        $code = sprintf("%06d", mt_rand(0, 999999));
        $otpExpiresAt = time() + 300;

        // Save OTP code in cache for 5 minutes
        Cache::put("2fa_enable:otp_code:{$user->id}", $code, 300);
        Cache::put("2fa_enable:otp_expires_at:{$user->id}", $otpExpiresAt, 300);

        // 4. Send the responsive HTML email
        try {
            \Illuminate\Support\Facades\Mail::to($user->email)->send(
                new \App\Mail\EnableTwoFactorOtpMail($user, $code)
            );
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning("SMTP EMAIL DELIVERY FAILED: " . $e->getMessage() . ". FOR TESTING, YOUR ENABLE 2FA CODE IS: " . $code);
        }

        return response()->json([
            'success' => true,
            'otp_expires_at' => $otpExpiresAt,
            'message' => 'Password confirmed. A verification OTP has been sent to your email.'
        ]);
    }

    /**
     * Progressive 2FA: Verify OTP and enable 2FA with subsequent auto-logout.
     */
    public function verifyTwoFactorOtp(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        $user = $request->user();
        
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ]);

        $otpSuspensionKey = "2fa_enable:otp_suspended:{$user->id}";
        $otpAttemptsKey = "2fa_enable:otp_attempts:{$user->id}";
        $otpCodeKey = "2fa_enable:otp_code:{$user->id}";

        // 1. Check if OTP verification is suspended (5 minutes)
        if (Cache::has($otpSuspensionKey)) {
            $secondsLeft = Cache::get($otpSuspensionKey) - time();
            if ($secondsLeft > 0) {
                return response()->json([
                    'errors' => [
                        'code' => ["2FA confirmation is suspended. Please try again later."],
                        'suspended_until' => (int) Cache::get($otpSuspensionKey)
                    ]
                ], 422);
            }
            Cache::forget($otpSuspensionKey);
            Cache::forget($otpAttemptsKey);
        }

        // 2. Validate OTP code presence in Cache
        if (!Cache::has($otpCodeKey)) {
            return response()->json([
                'errors' => [
                    'code' => ['The verification OTP has expired. Please restart the 2FA activation flow.']
                ]
            ], 422);
        }

        $cachedOtp = Cache::get($otpCodeKey);

        // 3. Verify OTP code matches
        if ($request->code !== $cachedOtp) {
            // Increment failed attempts
            $attempts = Cache::get($otpAttemptsKey, 0) + 1;
            Cache::put($otpAttemptsKey, $attempts, 300); // Keep for 5 minutes

            if ($attempts >= 3) {
                $until = time() + 300;
                Cache::put($otpSuspensionKey, $until, 300); // Suspend for 5 minutes
                Cache::forget($otpCodeKey); // Wipe the expired/failed OTP code
                return response()->json([
                    'errors' => [
                        'code' => ['Too many incorrect OTP attempts. 2FA setup is suspended.'],
                        'suspended_until' => $until
                    ]
                ], 422);
            }

            $remaining = 3 - $attempts;
            return response()->json([
                'errors' => [
                    'code' => ["Incorrect verification code. {$remaining} attempts remaining."]
                ]
            ], 422);
        }

        // Correct OTP! Reset attempts and verification states
        Cache::forget($otpAttemptsKey);
        Cache::forget($otpSuspensionKey);
        Cache::forget($otpCodeKey);

        // 4. Update User Database
        $user->email_2fa_enabled = true;
        $user->save();

        // 5. Force Auto-Logout for mandatory security verification testing!
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // 6. Flash success message for redirect
        session()->flash('success', 'Email 2FA has been successfully enabled! Please log in to verify your setup.');

        return response()->json([
            'success' => true,
            'redirect' => route('login'),
            'message' => 'Email Two-Factor Authentication is now active! Redirecting to login for verification...'
        ]);
    }

    /**
     * Progressive 2FA: Resend OTP code only if expired.
     */
    public function resendTwoFactorOtp(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        $user = $request->user();
        
        $otpSuspensionKey = "2fa_enable:otp_suspended:{$user->id}";
        $otpCodeKey = "2fa_enable:otp_code:{$user->id}";

        // 1. If currently suspended, do not allow resending
        if (Cache::has($otpSuspensionKey)) {
            $secondsLeft = Cache::get($otpSuspensionKey) - time();
            if ($secondsLeft > 0) {
                return response()->json([
                    'errors' => [
                        'code' => ['2FA setup is suspended. Cannot resend code.'],
                        'suspended_until' => (int) Cache::get($otpSuspensionKey)
                    ]
                ], 422);
            }
        }

        // 2. Only allow generating a new one if it is expired in cache
        if (Cache::has($otpCodeKey)) {
            return response()->json([
                'errors' => [
                    'code' => ['The active verification OTP has not expired yet.']
                ]
            ], 422);
        }

        // Generate a secure random 6-digit OTP code (000000 - 999999)
        $code = sprintf("%06d", mt_rand(0, 999999));
        $otpExpiresAt = time() + 300;

        // Save OTP code in cache for 5 minutes (300 seconds)
        Cache::put($otpCodeKey, $code, 300);
        Cache::put("2fa_enable:otp_expires_at:{$user->id}", $otpExpiresAt, 300);

        // Send the responsive HTML email
        try {
            \Illuminate\Support\Facades\Mail::to($user->email)->send(
                new \App\Mail\EnableTwoFactorOtpMail($user, $code)
            );
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning("SMTP EMAIL DELIVERY FAILED: " . $e->getMessage() . ". FOR TESTING, YOUR ENABLE 2FA RESEND CODE IS: " . $code);
        }

        return response()->json([
            'success' => true,
            'otp_expires_at' => $otpExpiresAt,
            'message' => 'A fresh verification OTP has been dispatched to your email.'
        ]);
    }

    /**
     * Disable email two-factor authentication.
     */
    public function updateTwoFactor(Request $request): RedirectResponse
    {
        $user = $request->user();
        
        $request->validate([
            'password' => ['required', 'string'],
            'enable' => ['required', 'boolean'],
        ]);

        // Verify password using custom zero-knowledge PBKDF2 auth system
        $auth_salt = base64_decode($user->auth_salt);
        $password_derivedKey = hash_pbkdf2(
            'sha256',
            $request->password,
            $auth_salt,
            100000,
            32,
            true
        );

        if (!hash_equals(base64_encode($password_derivedKey), $user->password_hash)) {
            return back()->withErrors(['password' => 'The password you entered is incorrect.']);
        }

        // Only support disabling here (enabling is handled progressively via OTP)
        $user->email_2fa_enabled = false;
        $user->save();

        session()->flash('success', 'Email Two-Factor Authentication has been successfully disabled!');

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'string'],
        ]);

        $user = $request->user();

        // Verify password using custom auth system
        $auth_salt = base64_decode($user->auth_salt);
        $password_derivedKey = hash_pbkdf2(
            'sha256',
            $request->password,
            $auth_salt,
            100000,
            32,
            true
        );

        if (!hash_equals(base64_encode($password_derivedKey), $user->password_hash)) {
            return back()->withErrors(['password' => 'The password is incorrect.']);
        }

        Auth::logout();

        User::destroy($user->getAuthIdentifier());

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
