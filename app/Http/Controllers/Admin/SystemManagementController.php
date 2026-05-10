<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Document;
use App\Models\StegoFile;
use App\Models\Fragment;
use App\Models\StegoMap;
use App\Providers\B2Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SystemManagementController extends Controller
{

    public function auditIntegrity()
    {
        $b2Service = new B2Service();
        $cloudFiles = $b2Service->listAllFiles();
        
        // 1. Identify Ghost Files (B2 locked/ files with no StegoFile record)
        $lockedFiles = array_filter($cloudFiles, fn($f) => str_starts_with($f['fileName'], 'locked/'));
        $dbFilenames = StegoFile::pluck('filename')->toArray();
        
        $ghosts = [];
        foreach ($lockedFiles as $file) {
            $pureFilename = basename($file['fileName']);
            if (!in_array($pureFilename, $dbFilenames)) {
                $ghosts[] = [
                    'fileId' => $file['fileId'],
                    'fileName' => $file['fileName'],
                    'size' => $file['contentLength'],
                    'uploadTimestamp' => $file['uploadTimestamp']
                ];
            }
        }

        // 2. Identify Mismatched Documents
        // Logic: Document.fragment_count must match count(fragments) and count(stego_files)
        $documents = Document::withCount(['fragments', 'stegoFiles'])
            ->whereIn('status', ['fragmented', 'mapped', 'embedded', 'stored'])
            ->get();

        $mismatched = $documents->filter(function($doc) {
            return $doc->fragment_count != $doc->fragments_count || 
                   ($doc->status === 'stored' && $doc->fragment_count != $doc->stego_files_count);
        })->map(function($doc) {
            return [
                'id' => $doc->document_id,
                'name' => $doc->filename,
                'status' => $doc->status,
                'expected' => $doc->fragment_count,
                'actual_fragments' => $doc->fragments_count,
                'actual_stego' => $doc->stego_files_count,
                'user' => $doc->user->name ?? 'Unknown'
            ];
        })->values();

        return response()->json([
            'ghosts' => $ghosts,
            'mismatched' => $mismatched,
            'stats' => [
                'ghost_count' => count($ghosts),
                'ghost_size' => array_sum(array_column($ghosts, 'size')),
                'mismatched_count' => count($mismatched)
            ]
        ]);
    }

    public function purgeGhosts(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*.fileId' => 'required|string',
            'files.*.fileName' => 'required|string',
        ]);

        $b2Service = new B2Service();
        $results = $b2Service->deleteFilesBatch($request->files);

        return response()->json([
            'success' => true,
            'deleted_count' => count($results),
            'results' => $results
        ]);
    }

    public function cloudIndex()
    {
        $totalStorageLimit = User::sum('storage_limit');
        $users = User::where('role', User::ROLE_USER)
            ->orderBy('storage_used', 'desc')
            ->get(['id', 'name', 'email', 'storage_used', 'storage_limit', 'is_active']);

        // Fetch Real-time Cloud Stats via B2 API
        $b2Service = new \App\Providers\B2Service();
        $cloudFiles = $b2Service->listAllFiles();
        
        $realStats = [
            'total_bytes' => 0,
            'covers_bytes' => 0,
            'locked_bytes' => 0,
            'other_bytes' => 0,
            'file_count' => count($cloudFiles)
        ];

        foreach ($cloudFiles as $file) {
            $size = $file['contentLength'] ?? 0;
            $realStats['total_bytes'] += $size;
            
            $name = $file['fileName'];
            if (str_starts_with($name, 'cover_')) {
                $realStats['covers_bytes'] += $size;
            } elseif (str_starts_with($name, 'locked/')) {
                $realStats['locked_bytes'] += $size;
            } else {
                $realStats['other_bytes'] += $size;
            }
        }

        return Inertia::render('Admin/Cloud', [
            'stats' => [
                'total_used_bytes' => $realStats['total_bytes'],
                'total_limit_bytes' => $totalStorageLimit,
                'usage_percentage' => $totalStorageLimit > 0 ? round(($realStats['total_bytes'] / $totalStorageLimit) * 100, 2) : 0,
                'user_count' => $users->count(),
                'breakdown' => [
                    'covers_bytes' => $realStats['covers_bytes'],
                    'fragments_bytes' => $realStats['locked_bytes'],
                    'other_bytes' => $realStats['other_bytes']
                ],
                'b2_bucket' => env('B2_BUCKET_ID'),
                'file_count' => $realStats['file_count']
            ],
            'users' => $users
        ]);
    }

    public function databaseIndex()
    {
        $dbName = config('database.connections.mysql.database');
        
        // 1. Basic Schema Stats
        $tables = DB::select("
            SELECT 
                table_name AS name, 
                engine, 
                table_rows AS `rows`, 
                data_length + index_length AS size_bytes,
                data_length AS data_bytes,
                index_length AS index_bytes
            FROM information_schema.TABLES 
            WHERE table_schema = ?
        ", [$dbName]);

        $dbSize = array_reduce($tables, function($carry, $item) {
            return $carry + $item->size_bytes;
        }, 0);

        // 2. Data Integrity Audit (Cloud vs DB Referential Integrity)
        $b2Service = new \App\Providers\B2Service();
        $cloudFiles = $b2Service->listAllFiles();
        $lockedFileNames = array_map(fn($f) => $f['fileName'], array_filter($cloudFiles, fn($f) => str_starts_with($f['fileName'], 'locked/')));

        // A "StegoFile" is the physical file in B2 'locked/' prefix.
        // It points to a fragment. If the stego file is missing, the fragment is lost.
        $stegoFiles = \App\Models\StegoFile::where('status', 'embedded')
            ->with('map')
            ->get();
        $orphanedStego = [];
        $zombieDocIds = [];

        foreach ($stegoFiles as $sf) {
            $expectedB2Path = 'locked/' . $sf->filename;
            if (!in_array($expectedB2Path, $lockedFileNames)) {
                // This stego file is missing from cloud!
                $orphanedStego[] = [
                    'id' => $sf->stego_file_id,
                    'filename' => $sf->filename,
                    'fragment_id' => $sf->fragment_id
                ];

                // Find the document this belongs to via the map
                if ($sf->map && $sf->map->document_id) {
                    $zombieDocIds[] = $sf->map->document_id;
                }
            }
        }

        // Identify "Zombie" Documents (those missing one or more stego files)
        $zombieDocs = [];
        if (!empty($zombieDocIds)) {
            $zombieDocs = \App\Models\Document::whereIn('document_id', array_unique($zombieDocIds))
                ->with('user:id,name')
                ->get(['document_id', 'filename', 'user_id', 'created_at']);
        }

        return Inertia::render('Admin/Database', [
            'database' => [
                'name' => $dbName,
                'size_bytes' => $dbSize,
                'table_count' => count($tables),
                'version' => DB::select("SELECT VERSION() as version")[0]->version,
            ],
            'tables' => $tables,
            'integrity' => [
                'total_stego_files' => $stegoFiles->count(),
                'orphaned_count' => count($orphanedStego),
                'zombie_documents' => $zombieDocs,
                'last_audit' => now()->toDateTimeString(),
                'is_healthy' => count($orphanedStego) === 0
            ]
        ]);
    }

    public function updateStorageLimit(Request $request, User $user)
    {
        $request->validate([
            'storage_limit' => 'required|integer|min:0'
        ]);

        $user->update(['storage_limit' => $request->storage_limit]);

        return back()->with('success', "Storage limit for {$user->name} updated successfully.");
    }
}
