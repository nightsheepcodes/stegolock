<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;

class CapacityController extends Controller
{
    /**
     * Check if there is enough global B2 capacity left for a new user.
     * The cloud allocation is 10 GB (10737418240 bytes).
     * Each user reserves a storage_limit (currently 250 MB).
     * If the remaining space after accounting for all existing users is
     * less than one user limit, we consider the system full.
     */
    public function check(): JsonResponse
    {
        $totalCapacity = 10737418240; // 10 GB in bytes
        $userLimit = config('app.user_storage_limit', 262144000); // fallback 250 MB
        // Sum storage limits of all users (including superadmins, they also reserve space)
        $reserved = DB::table('users')->sum('storage_limit');
        $remaining = max(0, $totalCapacity - $reserved);
        $available = $remaining >= $userLimit;

        Log::info('[Capacity] remaining bytes: '.$remaining.', available for new account: '.($available ? 'yes' : 'no'));

        return response()->json([
            'available' => $available,
            'remaining_bytes' => $remaining,
            'required_bytes' => $userLimit,
        ]);
    }
}
