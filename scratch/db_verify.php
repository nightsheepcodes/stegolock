<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$coversCount = DB::table('covers')->count();
echo "Total covers in pool: " . $coversCount . PHP_EOL;

if ($coversCount > 0) {
    $covers = DB::table('covers')->select('cover_id', 'type', 'filename', 'metadata')->limit(5)->get();
    foreach ($covers as $c) {
        echo "ID: {$c->cover_id} | Type: {$c->type} | File: {$c->filename} | Meta: {$c->metadata}\n";
    }
}
