<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Force testing environment so steganography job runs in mock mode
$app['env'] = 'testing';

use App\Models\User;
use App\Models\Document;
use App\Models\Fragment;
use App\Jobs\ProcessSteganoJob;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

echo "1. Creating dummy user and document...\n";
$user = User::first();
if (!$user) {
    echo "No user found. Please run seeders first.\n";
    exit(1);
}

// Create a dummy document
$document = Document::create([
    'user_id' => $user->id,
    'filename' => "test_secure_file.txt",
    'file_type' => "txt",
    'file_hash' => hash('sha256', "dummy_original_content"),
    'temp_path' => "temp/uploads/dummy_temp.txt",
    'original_size' => 100,
    'encrypted_size' => 120,
    'status' => 'uploaded',
]);

// Write a dummy encrypted file to local disk
$tempEncDir = 'temp/encrypted';
if (!Storage::disk('local')->exists($tempEncDir)) {
    Storage::disk('local')->makeDirectory($tempEncDir);
}
$encryptedFileName = Str::uuid() . ".stegolock";
$encryptedPath = $tempEncDir . '/' . $encryptedFileName;
Storage::disk('local')->put($encryptedPath, str_repeat("A", 120)); // 120 bytes of dummy encrypted data

echo "Created document with ID: {$document->document_id} and temp encrypted file path: {$encryptedPath}\n";

echo "2. Running ProcessSteganoJob...\n";
$job = new ProcessSteganoJob($document->document_id, $encryptedPath, (string) Str::uuid(), null);
$job->handle();

// Reload document and verify status
$document->refresh();
echo "3. Document status after processing: {$document->status}\n";

// Query the fragments
$fragments = Fragment::where('document_id', $document->document_id)->get();
echo "4. Total fragments created: " . $fragments->count() . "\n";

$allPurged = true;
foreach ($fragments as $f) {
    $blobValue = $f->blob;
    $blobStatus = is_null($blobValue) ? "NULL (Successfully Purged)" : "NOT NULL (Failed Purging)";
    if (!is_null($blobValue)) {
        $allPurged = false;
    }
    echo "   Fragment ID: {$f->fragment_id} | Index: {$f->index} | Size: {$f->size} bytes | Hash: " . substr($f->hash, 0, 10) . "... | Blob: {$blobStatus}\n";
}

if ($allPurged && $fragments->count() > 0) {
    echo "\n=== SUCCESS: All raw fragment ciphertext blobs were securely purged from the database! ===\n";
} else {
    echo "\n=== FAILURE: Purging failed or no fragments were found. ===\n";
}

// Clean up
echo "\n5. Cleaning up dummy data...\n";
$document->delete();
echo "Cleanup completed.\n";
