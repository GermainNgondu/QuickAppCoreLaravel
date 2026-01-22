<?php

namespace App\Core\Domains\Media\Drivers;

use Illuminate\Support\Facades\Http;
use App\Core\Domains\Media\Contracts\MediaSourceDriver;


class UnsplashDriver implements MediaSourceDriver
{
    protected string $baseUrl = 'https://api.unsplash.com';

    public function getName(): string
    {
        return 'unsplash';
    }

    public function search(string $query, int $page = 1, int $perPage = 20): array
    {
        $response = Http::withToken(config('services.unsplash.key'))
            ->get("{$this->baseUrl}/search/photos", [
                'query'    => $query,
                'page'     => $page,
                'per_page' => $perPage,
            ]);

        if ($response->failed()) return [];

        // On normalise la réponse pour le MediaPicker React
        return collect($response->json('results'))->map(fn($item) => [
            'id'        => $item['id'],
            'source'    => $this->getName(),
            'url'       => $item['urls']['regular'],
            'thumb'     => $item['urls']['small'],
            'author'    => $item['user']['name'],
            'author_url'=> $item['user']['links']['html'],
            'description' => $item['alt_description'] ?? $item['description'],
        ])->toArray();
    }

    public function find(string $id): array
    {
        $response = Http::withToken(config('services.unsplash.key'))
            ->get("{$this->baseUrl}/photos/{$id}");

        return $response->json() ?? [];
    }
}