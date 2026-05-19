<?php

namespace App\Providers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class B2Service
{
    private string $keyId;
    private string $appKey;
    private string $apiUrl;
    private string $authToken;

    public function __construct()
    {
        $this->keyId = config('services.b2.key_id');
        $this->appKey = config('services.b2.application_key');
    }

    public function authorize()
    {
        /** @var \Illuminate\Http\Client\Response $response */
        $response = Http::withBasicAuth($this->keyId, $this->appKey)
            ->get('https://api.backblazeb2.com/b2api/v2/b2_authorize_account');

        $data = $response->json();

        $this->apiUrl = $data['apiUrl'];
        $this->authToken = $data['authorizationToken'];

        return $data;
    }

    public function getAuth()
    {

        return cache()->remember('b2_auth', 3500, function () {
            /** @var \Illuminate\Http\Client\Response $res */
            $res = Http::withBasicAuth($this->keyId, $this->appKey)
                ->get('https://api.backblazeb2.com/b2api/v2/b2_authorize_account');

            $data = $res->json();

            return [
                'apiUrl' => $data['apiUrl'],
                'token' => $data['authorizationToken'],
                'bucketId' => $data['allowed']['bucketId'] ?? null,
                'downloadUrl' => $data['downloadUrl'] ?? null,

            ];
        });
    }

    private ?array $cachedUploadUrl = null;

    public function getUploadUrl($forceFresh = false)
    {
        if (!$forceFresh && $this->cachedUploadUrl) {
            return $this->cachedUploadUrl;
        }

        $auth = $this->getAuth();

        /** @var \Illuminate\Http\Client\Response $response */
        $response = Http::timeout(60)->withHeaders([
            'Authorization' => $auth['token'],
        ])->post($auth['apiUrl'] . '/b2api/v2/b2_get_upload_url', [
            'bucketId' => config('services.b2.bucket_id'),
        ]);

        $this->cachedUploadUrl = $response->json();
        return $this->cachedUploadUrl;
    }

    public function uploadFile($file)
    {
        $upload = $this->getUploadUrl();

        $fileName = 'temp-upload/'.bin2hex(random_bytes(16)) . '.' . $file->getClientOriginalExtension();

        $content = file_get_contents($file->getRealPath());

        $sha1 = sha1($content);

        $stream = fopen($file->getRealPath(), 'r');

        if ($content === false || $stream === false) {
            throw new \Exception("Failed to read file");
        }

        /** @var \Illuminate\Http\Client\Response $response */
        $response = Http::timeout(180)
        ->withHeaders([
            'Authorization' => $upload['authorizationToken'],
            'X-Bz-File-Name' => $fileName,
            'Content-Type' => 'b2/x-auto',
            'X-Bz-Content-Sha1' => $sha1,
        ])
        ->withBody($stream, 'application/octet-stream')
        ->post($upload['uploadUrl']);

        fclose($stream);

        return $response->json();
    }

    public function download(string $fileId)
    {
        $auth = $this->getAuth();

        /** @var \Illuminate\Http\Client\Response $response */
        $response = Http::withHeaders([
            'Authorization' => $auth['token'],
        ])->withOptions([
            'stream' => true,
        ])->post($auth['apiUrl'] . '/b2api/v2/b2_download_file_by_id', [
            'fileId' => $fileId,
        ]);

        if (!$response->successful()) {
            throw new \Exception('B2 streaming download failed');
        }

        return $response;
    }

    public function storeFile(string $filePath)
    {
        $store = $this->getUploadUrl();

        $fileName = 'locked/'. basename($filePath);
        $sha1 = sha1_file($filePath);

        $client = new \GuzzleHttp\Client([
            'timeout' => 0,
        ]);

        try {
            $response = $client->request('POST', $store['uploadUrl'], [
                'headers' => [
                    'Authorization' => $store['authorizationToken'],
                    'X-Bz-File-Name' => $fileName,
                    'Content-Type' => 'b2/x-auto',
                    'X-Bz-Content-Sha1' => $sha1,
                ],
                'body' => fopen($filePath, 'r'),
            ]);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            // If 401 or other error, maybe the upload URL expired. 
            // We could retry with $forceFresh = true here, but for simplicity let's just throw.
            throw $e;
        }

        return json_decode($response->getBody(), true);
    }

    public function findFileByName(string $fileName)
    {
        if (app()->environment('testing')) {
            $filename = basename($fileName);
            $mockPath = 'temp/mock_b2/' . $filename;
            if (!\Illuminate\Support\Facades\Storage::disk('local')->exists($mockPath)) {
                $mockPath = 'covers/' . $filename;
            }
            
            if (\Illuminate\Support\Facades\Storage::disk('local')->exists($mockPath)) {
                return [
                    'fileId' => 'mock-id-' . $filename,
                    'fileName' => $fileName,
                    'contentLength' => strlen(\Illuminate\Support\Facades\Storage::disk('local')->get($mockPath))
                ];
            }
            return null;
        }

        $auth = $this->getAuth();

        /** @var \Illuminate\Http\Client\Response $response */
        $response = Http::withHeaders([
            'Authorization' => $auth['token'],
        ])->post($auth['apiUrl'] . '/b2api/v2/b2_list_file_names', [
            'bucketId' => config('services.b2.bucket_id'),
            'startFileName' => $fileName,
            'maxFileCount' => 1,
            'prefix' => $fileName,
        ]);

        if (!$response->successful()) {
            return null;
        }

        $data = $response->json();
        return $data['files'][0] ?? null;
    }

    public function listFiles() //300 files limit
    {
        $auth = $this->getAuth();

        /** @var \Illuminate\Http\Client\Response $response */
        $response = Http::withHeaders([
            'Authorization' => $auth['token'],
        ])->post($auth['apiUrl'] . '/b2api/v2/b2_list_file_names', [
            'bucketId' => config('services.b2.bucket_id'),
            'maxFileCount' => 300,
        ]);

        if (!$response->successful()) {
            return ['files' => []];
        }

        return $response->json();
    }

    public function listAllFiles() //list all files
    {
        $attempt = 0;
        $maxAttempts = 2;

        while ($attempt < $maxAttempts) {
            $auth = $this->getAuth();
            $files = [];
            $nextFileName = null;
            $failed = false;

            do {
                /** @var \Illuminate\Http\Client\Response $response */
                $response = Http::withHeaders([
                    'Authorization' => $auth['token'],
                ])->post($auth['apiUrl'] . '/b2api/v2/b2_list_file_names', [
                    'bucketId' => config('services.b2.bucket_id'),
                    'maxFileCount' => 200,
                    'startFileName' => $nextFileName,
                ]);

                if (!$response->successful()) {
                    if ($response->status() === 401 && $attempt === 0) {
                        // Token might be expired, clear cache and retry the whole list process
                        cache()->forget('b2_auth');
                        $failed = true;
                        break;
                    }
                    
                    \Illuminate\Support\Facades\Log::error("B2 list_file_names failed: " . $response->body());
                    return []; // Return empty on hard failure
                }

                $data = $response->json();
                if (!isset($data['files'])) break;

                $files = array_merge($files, $data['files']);
                $nextFileName = $data['nextFileName'] ?? null;

            } while ($nextFileName);

            if (!$failed) {
                return $files;
            }

            $attempt++;
        }

        return [];
    }

    public function listAllVersions()
    {
        $auth = $this->getAuth();

        /** @var \Illuminate\Http\Client\Response $response */
        $response = Http::withHeaders([
            'Authorization' => $auth['token'],
        ])->post($auth['apiUrl'] . '/b2api/v2/b2_list_file_versions', [
            'bucketId' => config('services.b2.bucket_id'),
            'maxFileCount' => 100,
        ]);

        return $response->json();
    }

    public function deleteFile($fileId, $fileName)
    {
        if (app()->environment('testing')) {
            $filename = basename($fileName);
            $mockPath = 'temp/mock_b2/' . $filename;
            \Illuminate\Support\Facades\Storage::disk('local')->delete($mockPath);
            return ['deleted' => true];
        }

        $auth = $this->getAuth();

        /** @var \Illuminate\Http\Client\Response $response */
        $response = Http::withHeaders([
            'Authorization' => $auth['token'],
        ])->post($auth['apiUrl'] . '/b2api/v2/b2_delete_file_version', [
            'fileId' => $fileId,
            'fileName' => $fileName,
        ]);

        return $response->json();
    }

    public function getFileInfo($fileId)
    {
        if (app()->environment('testing')) {
            $filename = str_replace('mock-id-', '', $fileId);
            return [
                'fileId' => $fileId,
                'fileName' => 'locked/' . $filename,
            ];
        }

        $auth = $this->getAuth();

        /** @var \Illuminate\Http\Client\Response $response */
        $response = Http::withHeaders([
            'Authorization' => $auth['token'],
        ])->post($auth['apiUrl'] . '/b2api/v2/b2_get_file_info', [
            'fileId' => $fileId,
        ]);

        return $response->json();
    }

    public function readfile($fileId)
    {
        if (app()->environment('testing')) {
            $filename = str_replace('mock-id-', '', $fileId);
            $mockPath = 'temp/mock_b2/' . $filename;
            if (!\Illuminate\Support\Facades\Storage::disk('local')->exists($mockPath)) {
                $mockPath = 'covers/' . $filename;
            }
            return \Illuminate\Support\Facades\Storage::disk('local')->get($mockPath);
        }

        $response = $this->download($fileId);

        $plaintext = '';

        $stream = $response->getBody();

        if (!$stream) {
            throw new \Exception('stream empty');
        }

        while (!$stream->eof()) {
            $plaintext .= $stream->read(8192);
        }

        if (!$plaintext) {
            throw new \Exception('stream->read failed, empty plaintext');
        }

        $stream->close();

        return $plaintext;
    }

    public function storeFilesBatch(array $filePaths, int $concurrency = 5, ?callable $onProgress = null)
    {
        if (app()->environment('testing')) {
            $results = [];
            foreach ($filePaths as $path) {
                $filename = basename($path);
                $mockPath = 'temp/mock_b2/' . $filename;
                \Illuminate\Support\Facades\Storage::disk('local')->put($mockPath, file_get_contents($path));
                
                $data = [
                    'fileId' => 'mock-id-' . $filename,
                    'fileName' => 'locked/' . $filename,
                    'contentLength' => filesize($path)
                ];
                $results[$path] = $data;
                if ($onProgress) {
                    $onProgress($path, $data);
                }
            }
            return $results;
        }

        $results = [];
        $client = new \GuzzleHttp\Client(['timeout' => 0]);

        // Pre-fetch upload URLs (one for each concurrent slot)
        $uploadUrls = [];
        for ($i = 0; $i < $concurrency; $i++) {
            $uploadUrls[] = $this->getUploadUrl(true);
            usleep(100000); // Small stagger to ensure B2 allocates unique pods
        }

        $requests = function () use ($client, $filePaths, $uploadUrls, $concurrency) {
            foreach ($filePaths as $i => $filePath) {
                $initialStore = $uploadUrls[$i % $concurrency];
                $fileName = 'locked/' . basename($filePath);
                $sha1 = sha1_file($filePath);

                yield $filePath => function () use ($client, $initialStore, $fileName, $sha1, $filePath) {
                    $attemptUpload = function ($store, $attempt = 0) use (&$attemptUpload, $client, $fileName, $sha1, $filePath) {
                        return $client->requestAsync('POST', $store['uploadUrl'], [
                            'headers' => [
                                'Authorization' => $store['authorizationToken'],
                                'X-Bz-File-Name' => $fileName,
                                'Content-Type' => 'b2/x-auto',
                                'X-Bz-Content-Sha1' => $sha1,
                            ],
                            'body' => fopen($filePath, 'r'),
                        ])->then(
                            null, // Success passes through
                            function ($reason) use ($store, $attempt, $attemptUpload) {
                                if ($attempt < 3 && $reason instanceof \GuzzleHttp\Exception\ClientException) {
                                    $response = $reason->getResponse();
                                    $error = json_decode($response->getBody(), true);
                                    
                                    if (isset($error['code']) && $error['code'] === 'auth_token_limit') {
                                        usleep(250000); // 250ms wait
                                        $newStore = $this->getUploadUrl(true);
                                        return $attemptUpload($newStore, $attempt + 1);
                                    }
                                }
                                throw $reason;
                            }
                        );
                    };

                    return $attemptUpload($initialStore);
                };
            }
        };

        $pool = new \GuzzleHttp\Pool($client, $requests(), [
            'concurrency' => $concurrency,
            'fulfilled' => function (\GuzzleHttp\Psr7\Response $response, $path) use (&$results, $onProgress) {
                $data = json_decode($response->getBody(), true);
                $results[$path] = $data;
                if ($onProgress) {
                    $onProgress($path, $data);
                }
            },
            'rejected' => function ($reason, $path) {
                throw new \Exception("Batch upload failed for {$path}: " . $reason->getMessage());
            },
        ]);

        $pool->promise()->wait();

        return $results;
    }

    /**
     * Downloads multiple files in parallel using Guzzle Pool.
     * 
     * @param array $fileData Array of ['fileId' => ..., 'savePath' => ...]
     * @param int $concurrency Number of simultaneous downloads
     */
    public function fetchFilesBatch(array $fileData, int $concurrency = 5)
    {
        if (app()->environment('testing')) {
            $results = [];
            foreach ($fileData as $item) {
                $filename = basename($item['savePath']);
                $mockPath = 'temp/mock_b2/' . $filename;
                $content = \Illuminate\Support\Facades\Storage::disk('local')->get($mockPath);
                if (!file_exists(dirname($item['savePath']))) {
                    mkdir(dirname($item['savePath']), 0755, true);
                }
                file_put_contents($item['savePath'], $content);
                $results[$item['savePath']] = true;
            }
            return $results;
        }

        $auth = $this->getAuth();
        $client = new \GuzzleHttp\Client([
            'base_uri' => $auth['downloadUrl'],
            'timeout'  => 120,
        ]);

        $results = [];

        $requests = function () use ($client, $fileData, $auth) {
            foreach ($fileData as $item) {
                yield $item['savePath'] => function () use ($client, $item, $auth) {
                    return $client->requestAsync('GET', "/b2api/v2/b2_download_file_by_id?fileId=" . $item['fileId'], [
                        'headers' => [
                            'Authorization' => $auth['token'],
                        ],
                    ]);
                };
            }
        };

        $pool = new \GuzzleHttp\Pool($client, $requests(), [
            'concurrency' => $concurrency,
            'fulfilled' => function (\GuzzleHttp\Psr7\Response $response, $path) use (&$results) {
                file_put_contents($path, $response->getBody());
                $results[$path] = true;
            },
            'rejected' => function ($reason, $path) {
                throw new \Exception("Batch download failed for {$path}: " . $reason->getMessage());
            },
        ]);

        $pool->promise()->wait();

        return $results;
    }

    /**
     * Deletes multiple files in parallel using Guzzle Pool.
     * 
     * @param array $fileData Array of ['fileId' => ..., 'fileName' => ...]
     * @param int $concurrency Number of simultaneous deletes
     */
    public function deleteFilesBatch(array $fileData, int $concurrency = 5)
    {
        if (app()->environment('testing')) {
            $results = [];
            foreach ($fileData as $item) {
                $filename = basename($item['fileName']);
                $mockPath = 'temp/mock_b2/' . $filename;
                \Illuminate\Support\Facades\Storage::disk('local')->delete($mockPath);
                $results[$item['fileId']] = ['deleted' => true];
            }
            return $results;
        }

        $auth = $this->getAuth();
        $client = new \GuzzleHttp\Client([
            'base_uri' => $auth['apiUrl'],
            'timeout'  => 60,
        ]);

        $results = [];

        $requests = function () use ($client, $fileData, $auth) {
            foreach ($fileData as $item) {
                yield $item['fileId'] => function () use ($client, $item, $auth) {
                    return $client->requestAsync('POST', '/b2api/v2/b2_delete_file_version', [
                        'headers' => [
                            'Authorization' => $auth['token'],
                        ],
                        'json' => [
                            'fileId' => $item['fileId'],
                            'fileName' => $item['fileName'],
                        ]
                    ]);
                };
            }
        };

        $pool = new \GuzzleHttp\Pool($client, $requests(), [
            'concurrency' => $concurrency,
            'fulfilled' => function ($response, $fileId) use (&$results) {
                $results[$fileId] = json_decode($response->getBody()->getContents(), true);
            },
            'rejected' => function ($reason, $fileId) {
                \Illuminate\Support\Facades\Log::error("Batch delete failed for fileId {$fileId}: " . $reason->getMessage());
            },
        ]);

        $pool->promise()->wait();

        return $results;
    }
}
