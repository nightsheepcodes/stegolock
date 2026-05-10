<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class CloudAccount extends Model
{
    protected $fillable = [
        'name',
        'key_id',
        'application_key',
        'bucket_name',
        'is_active',
    ];

    /**
     * Set the application key (encrypted).
     */
    public function setApplicationKeyAttribute($value)
    {
        $this->attributes['application_key'] = Crypt::encryptString($value);
    }

    /**
     * Get the application key (decrypted).
     */
    public function getApplicationKeyAttribute($value)
    {
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return null;
        }
    }
}
