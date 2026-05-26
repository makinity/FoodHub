<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class SupabaseStorageService
{
    private string $url;
    private string $key;

    public function __construct()
    {
        $this->url = config('services.supabase.storage_url');
        $this->key = config('services.supabase.key');
    }

    public function upload(UploadedFile $file, string $bucket): ?string
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->key,
            'Content-Type' => $file->getMimeType(),
        ])->withBody($file->getContent(), $file->getMimeType())
          ->post("{$this->url}/object/{$bucket}/{$filename}");

        if ($response->successful()) {
            return "{$this->url}/object/public/{$bucket}/{$filename}";
        }

        return null;
    }

    public function delete(string $path, string $bucket): void
    {
        // Extract filename if full URL is stored
        if (str_starts_with($path, 'http')) {
            $path = basename($path);
        }

        Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->key,
        ])->delete("{$this->url}/object/{$bucket}/{$path}");
    }

    public function url(string $path, string $bucket): string
    {
        return "{$this->url}/object/public/{$bucket}/{$path}";
    }
}
