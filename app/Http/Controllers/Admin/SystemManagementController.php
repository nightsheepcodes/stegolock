<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Document;
use App\Models\StegoFile;
use App\Models\Fragment;
use App\Models\StegoMap;
use App\Providers\B2Service;
use App\Models\CloudAccount;
use App\Jobs\TransferStegoFilesJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Process;
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
        $results = $b2Service->deleteFilesBatch($request->input('files'));

        return response()->json([
            'success' => true,
            'deleted_count' => count($results),
            'results' => $results
        ]);
    }

    public function cloudIndex()
    {
        $totalStorageLimit = User::sum('storage_limit');
        $users = User::orderBy('storage_used', 'desc')
            ->get(['id', 'name', 'email', 'role', 'storage_used', 'storage_limit', 'is_active']);

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
            'users' => $users,
            'cloudAccounts' => CloudAccount::all(),
            'transferStatus' => Cache::get('stego_transfer_status', ['running' => false])
        ]);
    }

    public function databaseIndex()
    {
        $dbName = DB::connection()->getDatabaseName();
        
        // Table Dictionary for Category and Description
        $tableDict = [
            'users' => ['category' => 'Core Data', 'desc' => 'System users and quotas'],
            'documents' => ['category' => 'Core Data', 'desc' => 'Uploaded files metadata'],
            'folders' => ['category' => 'Core Data', 'desc' => 'Virtual directory structure'],
            'document_shares' => ['category' => 'Core Data', 'desc' => 'File access permissions'],
            'fragments' => ['category' => 'Storage & Crypto', 'desc' => 'Encrypted file pieces'],
            'stego_maps' => ['category' => 'Storage & Crypto', 'desc' => 'Fragment to cloud mapping'],
            'stego_files' => ['category' => 'Storage & Crypto', 'desc' => 'Cloud file pointers'],
            'document_activities' => ['category' => 'Logs & Audit', 'desc' => 'File action history'],
            'jobs' => ['category' => 'Background Tasks', 'desc' => 'Active queue workers'],
            'failed_jobs' => ['category' => 'Background Tasks', 'desc' => 'Crashed background tasks'],
            'job_batches' => ['category' => 'Background Tasks', 'desc' => 'Grouped queue tasks'],
            'sessions' => ['category' => 'System & Auth', 'desc' => 'Active user sessions'],
            'migrations' => ['category' => 'System & Auth', 'desc' => 'Schema versions'],
            'password_reset_tokens' => ['category' => 'System & Auth', 'desc' => 'Auth recovery tokens'],
            'cache' => ['category' => 'System & Auth', 'desc' => 'Framework cache state'],
            'cache_locks' => ['category' => 'System & Auth', 'desc' => 'Atomic cache locks'],
        ];

        // 1. Basic Schema Stats using SHOW TABLE STATUS (more reliable in production)
        $tablesRaw = DB::select("SHOW TABLE STATUS");
        
        $tables = [];
        $dbSize = 0;

        foreach ($tablesRaw as $t) {
            $sizeBytes = ($t->Data_length ?? 0) + ($t->Index_length ?? 0);
            $dbSize += $sizeBytes;
            
            $info = $tableDict[$t->Name] ?? ['category' => 'Other', 'desc' => 'System table'];
            
            $tables[] = [
                'name' => $t->Name,
                'rows' => (int)($t->Rows ?? 0),
                'last_updated' => $t->Update_time,
                'category' => $info['category'],
                'description' => $info['desc']
            ];
        }

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

    public function storeCloudAccount(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'key_id' => 'required|string',
            'application_key' => 'required|string',
            'bucket_name' => 'required|string',
        ]);

        CloudAccount::create($validated);

        return back()->with('success', 'Cloud account added successfully.');
    }

    public function destroyCloudAccount(CloudAccount $account)
    {
        $account->delete();
        return back()->with('success', 'Cloud account removed.');
    }

    public function startTransfer(Request $request)
    {
        $request->validate([
            'target_account_id' => 'required|exists:cloud_accounts,id'
        ]);

        TransferStegoFilesJob::dispatch($request->target_account_id);

        Cache::put('stego_transfer_status', [
            'running' => true,
            'started_at' => now()->toDateTimeString(),
            'target_id' => $request->target_account_id
        ], now()->addHours(2));

        return back()->with('success', 'Transfer process started in the background.');
    }

    public function stopTransfer()
    {
        // Kill rclone processes
        if (PHP_OS_FAMILY === 'Windows') {
            Process::run('taskkill /F /IM rclone.exe');
        } else {
            Process::run('pkill rclone');
        }

        Cache::forget('stego_transfer_status');

        return back()->with('success', 'Transfer process stopped and cleaned up.');
    }

    public function getTableData(Request $request, $tableName)
    {
        // 1. Validate table exists in current DB using SHOW TABLES (more portable)
        $tableExists = DB::select("SHOW TABLES LIKE ?", [$tableName]);

        if (empty($tableExists)) {
            return response()->json(['error' => 'Table not found'], 404);
        }

        // 2. Fetch data (limit to first 100 rows for performance)
        // Attempt to order by most recent if standard ID columns exist
        $query = DB::table($tableName);
        
        $columnInfo = DB::select("SHOW COLUMNS FROM `$tableName` ");
        $columns = array_column($columnInfo, 'Field');

        if (in_array('id', $columns)) {
            $query->orderBy('id', 'desc');
        } elseif (in_array('created_at', $columns)) {
            $query->orderBy('created_at', 'desc');
        }

        $data = $query->limit(100)->get();

        return response()->json([
            'table' => $tableName,
            'columns' => $columns,
            'data' => $data
        ]);
    }
}
