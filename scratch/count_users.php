<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$users = \App\Models\User::all();
echo "Users count: " . $users->count() . PHP_EOL;
foreach ($users as $u) {
    echo "ID: {$u->id} | Email: {$u->email}\n";
}
