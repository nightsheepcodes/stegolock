<?php

$dir = "D:\\laragon\\www\\stegolock\\storage\\app\\private\\cache\\covers";

if (!file_exists($dir)) {
    die("Directory does not exist: $dir\n");
}

$files = array_diff(scandir($dir), ['.', '..']);
$count = 0;

foreach ($files as $file) {
    $filePath = $dir . DIRECTORY_SEPARATOR . $file;
    if (is_dir($filePath)) {
        continue;
    }

    $extension = pathinfo($file, PATHINFO_EXTENSION);
    $randomHex = bin2hex(random_bytes(16));
    $newFilename = "{$randomHex}_cover_" . time() . ".{$extension}";
    $newFilePath = $dir . DIRECTORY_SEPARATOR . $newFilename;

    if (rename($filePath, $newFilePath)) {
        echo "Renamed: $file -> $newFilename\n";
        $count++;
    } else {
        echo "Failed to rename: $file\n";
    }
}

echo "Successfully renamed $count files.\n";
