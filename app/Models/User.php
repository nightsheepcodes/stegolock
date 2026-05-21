<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    const ROLE_USER = 'user';
    const ROLE_USER_ADMIN = 'user_admin';
    const ROLE_DB_STORAGE_ADMIN = 'db_storage_admin';
    const ROLE_SUPERADMIN = 'superadmin';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'role',
        'is_active',
        'storage_used',
        'storage_limit',
        'tour_completed_at',
        'last_logout_at',
        'email_2fa_enabled',
    ];

    /**
     * The attributes that are not mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [
        'password_hash',
        'auth_salt',
        'ek_salt',
        'master_key_enc',
        'nonce',
        'tag',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password_hash',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'storage_used' => 'integer',
            'storage_limit' => 'integer',
            'is_active' => 'boolean',
            'tour_completed_at' => 'datetime',
            'last_logout_at' => 'datetime',
            'email_2fa_enabled' => 'boolean',
        ];
    }

    /**
     * Get the password for the user (required by Authenticatable).
     */
    public function getAuthPassword(): string
    {
        return $this->password_hash;
    }

    /**
     * Get the documents for the user.
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    /**
     * Shares sent by the user.
     */
    public function sentShares()
    {
        return $this->hasMany(DocumentShare::class, 'sender_id');
    }

    /**
     * Shares received by the user.
     */
    public function receivedShares()
    {
        return $this->hasMany(DocumentShare::class, 'recipient_id');
    }

    /**
     * Recalculate and update the storage_used column based on the sum of in_cloud_size of all user's documents.
     */
    public function refreshStorageUsed(): void
    {
        $totalUsed = $this->documents()->sum('in_cloud_size');
        $this->update(['storage_used' => $totalUsed]);
    }

    /**
     * Role checks
     */
    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    public function isUserAdmin(): bool
    {
        return in_array($this->role, [self::ROLE_USER_ADMIN, self::ROLE_SUPERADMIN]);
    }

    public function isDbStorageAdmin(): bool
    {
        return in_array($this->role, [self::ROLE_DB_STORAGE_ADMIN, self::ROLE_SUPERADMIN]);
    }

    public function isSuperadmin(): bool
    {
        return $this->role === self::ROLE_SUPERADMIN;
    }

    public function activities()
    {
        return $this->hasMany(ActivityLog::class);
    }

    /**
     * Get the email OTP record for the user.
     */
    public function emailOtp()
    {
        return $this->hasOne(EmailOtp::class);
    }

    /**
     * Get the login 2FA OTP record for the user.
     */
    public function loginOtp()
    {
        return $this->hasOne(LoginOtp::class);
    }

    /**
     * Send the email verification notification using our custom OTP mailable.
     */
    public function sendEmailVerificationNotification(): void
    {
        // 1. Generate a secure random 6-digit OTP code (000000 - 999999)
        $code = sprintf("%06d", mt_rand(0, 999999));

        // 2. Delete any existing OTP records for this user to avoid conflicts
        $this->emailOtp()->delete();

        // 3. Save the new OTP with a 5-minute validity window
        $this->emailOtp()->create([
            'code' => $code,
            'expires_at' => now()->addMinutes(5),
        ]);

        // 4. Send the beautiful responsive HTML email
        try {
            \Illuminate\Support\Facades\Mail::to($this->email)->send(
                new \App\Mail\EmailVerificationOtpMail($this, $code)
            );
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning("SMTP EMAIL DELIVERY FAILED: " . $e->getMessage() . ". FOR TESTING, YOUR EMAIL VERIFICATION CODE IS: " . $code);
        }
    }

    /**
     * Send the login 2FA OTP notification using our custom mailable.
     */
    public function sendLogin2faNotification(): string
    {
        // 1. Generate a secure random 6-digit OTP code (000000 - 999999)
        $code = sprintf("%06d", mt_rand(0, 999999));

        // 2. Delete any existing login OTP records for this user
        $this->loginOtp()->delete();

        // 3. Save the new OTP with a 5-minute validity window
        $this->loginOtp()->create([
            'code' => $code,
            'expires_at' => now()->addMinutes(5),
        ]);

        // 4. Send the login 2FA HTML email
        try {
            \Illuminate\Support\Facades\Mail::to($this->email)->send(
                new \App\Mail\LoginOtpMail($this, $code)
            );
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning("SMTP EMAIL DELIVERY FAILED: " . $e->getMessage() . ". FOR TESTING, YOUR LOGIN 2FA CODE IS: " . $code);
        }

        return $code;
    }
}
