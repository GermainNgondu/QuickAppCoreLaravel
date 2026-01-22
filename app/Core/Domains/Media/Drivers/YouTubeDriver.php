<?php

namespace App\Core\Domains\Media\Drivers;

use App\Core\Domains\Media\Contracts\MediaSourceDriver;

class YouTubeDriver implements MediaSourceDriver
{
    public function getName(): string { return 'youtube'; }

    public function search(string $url, int $page = 1, int $perPage = 1): array
    {
        // Extraction de l'ID YouTube
        preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $url, $match);
        $youtubeId = $match[1] ?? null;

        if (!$youtubeId) return [];

        return [[
            'id' => $youtubeId,
            'source' => 'youtube',
            'url' => "https://www.youtube.com/watch?v={$youtubeId}",
            'embed_url' => "https://www.youtube.com/embed/{$youtubeId}",
            'thumb' => "https://img.youtube.com/vi/{$youtubeId}/hqdefault.jpg",
            'title' => "Vidéo YouTube"
        ]];
    }

    public function find(string $id): array { return []; }
}