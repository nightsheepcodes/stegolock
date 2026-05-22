<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Force testing environment so steganography & unlock jobs run in mock mode
$app['env'] = 'testing';

use App\Models\User;
use App\Models\Document;
use App\Models\Fragment;
use App\Jobs\ProcessSteganoJob;
use App\Jobs\ProcessUnlockJob;
use App\Http\Controllers\DocumentController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

echo "1. Creating dummy user and document...\n";
$user = User::first();
if (!$user) {
    echo "No user found. Please run seeders first.\n";
    exit(1);
}

// Log user in
Auth::login($user);

// Create a dummy document
$document = Document::create([
    'user_id' => $user->id,
    'filename' => "status_flow_test.txt",
    'file_type' => "txt",
    'file_hash' => hash('sha256', "status_flow_original_content"),
    'temp_path' => "temp/uploads/status_flow_temp.txt",
    'original_size' => 100,
    'encrypted_size' => 120,
    'status' => 'uploaded',
]);

// Write dummy encrypted file
$tempEncDir = 'temp/encrypted';
if (!Storage::disk('local')->exists($tempEncDir)) {
    Storage::disk('local')->makeDirectory($tempEncDir);
}
$encryptedFileName = Str::uuid() . ".stegolock";
$encryptedPath = $tempEncDir . '/' . $encryptedFileName;
Storage::disk('local')->put($encryptedPath, str_repeat("B", 120));

echo "Created document ID: {$document->document_id} with status: {$document->status}\n";

// Query the fragments initially (they don't exist yet until SteganoJob splits)
echo "2. Running ProcessSteganoJob (Mocked steganographic embedding)...\n";
$job = new ProcessSteganoJob($document->document_id, $encryptedPath, (string) Str::uuid(), null);
$job->handle();

$document->refresh();
echo "Document status after SteganoJob: {$document->status}\n";

$fragments = Fragment::where('document_id', $document->document_id)->get();
echo "Total fragments: " . $fragments->count() . "\n";
foreach ($fragments as $f) {
    echo "   Fragment ID: {$f->fragment_id} | Index: {$f->index} | Current Status: {$f->status}\n";
}

// Ensure they are all embedded
$allEmbedded = $fragments->every(fn($f) => $f->status === 'embedded');
if ($allEmbedded) {
    echo "=> SUCCESS: All fragments successfully updated to 'embedded' during locking!\n";
} else {
    echo "=> FAILURE: Fragments were not correctly marked as 'embedded'.\n";
}

// Set up unlock context
echo "\n3. Running ProcessUnlockJob (Mocked extraction)...\n";

// Unlock document status must be stored, decrypted, or retrieved
$document->update(['status' => 'stored']);

// Mock master key and run ProcessUnlockJob
$masterKey = "super_secure_master_key_123456789";
$unlockJob = new ProcessUnlockJob($document->document_id, base64_encode($masterKey), $user->id, (string) Str::uuid());
$unlockJob->handle();

$document->refresh();
echo "Document status after UnlockJob: {$document->status}\n";

$fragments = Fragment::where('document_id', $document->document_id)->get();
foreach ($fragments as $f) {
    echo "   Fragment ID: {$f->fragment_id} | Index: {$f->index} | Current Status: {$f->status}\n";
}

// Ensure they are all extracted
$allExtracted = $fragments->every(fn($f) => $f->status === 'extracted');
if ($allExtracted) {
    echo "=> SUCCESS: All fragments successfully updated to 'extracted' during unlocking!\n";
} else {
    echo "=> FAILURE: Fragments were not correctly marked as 'extracted'.\n";
}

// Call Keep Controller Endpoint
echo "\n4. Simulating User choice to 'Keep' the file (retaining stego locks)...\n";
// Manually set status to 'decrypted' so the Controller's state guard accepts it
$document->update(['status' => 'decrypted']);

$controller = app(DocumentController::class);
$request = new Request(['document_id' => $document->document_id]);
$controller->keep($request);

$document->refresh();
echo "Document status after Keep action: {$document->status}\n";

$fragments = Fragment::where('document_id', $document->document_id)->get();
foreach ($fragments as $f) {
    echo "   Fragment ID: {$f->fragment_id} | Index: {$f->index} | Current Status: {$f->status}\n";
}

// Ensure they are all reset to embedded
$allEmbeddedAgain = $fragments->every(fn($f) => $f->status === 'embedded');
if ($allEmbeddedAgain) {
    echo "=> SUCCESS: All fragments successfully reset to 'embedded' when keeping file!\n";
} else {
    echo "=> FAILURE: Fragments were not reset to 'embedded'.\n";
}

// Cleanup
echo "\n5. Cleaning up dummy records...\n";
$document->delete();
echo "Cleanup completed successfully!\n";
