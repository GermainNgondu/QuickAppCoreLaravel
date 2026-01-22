<?php

namespace App\Core\Domains\Media\Drivers;

use Illuminate\Support\Facades\Http;
use App\Core\Domains\Media\Contracts\MediaSourceDriver;


class AiDriver implements MediaSourceDriver
{
    public function getName(): string
    {
        return 'ai';
    }

    public function search(string $query, int $page = 1, int $perPage = 1): array
    {
        // Pour l'IA, search() correspond à la génération
        $response = Http::withToken(config('services.openai.key'))
            ->post('https://api.openai.com/v1/images/generations', [
                'model'  => 'dall-e-3',
                'prompt' => $query,
                'n'      => 1,
                'size'   => '1024x1024',
            ]);

        if ($response->failed()) return [];

        return [[
            'id'     => uniqid('ai_'),
            'source' => $this->getName(),
            'url'    => $response->json('data.0.url'),
            'thumb'  => $response->json('data.0.url'), // DALL-E ne fournit qu'une URL
            'prompt' => $query
        ]];
    }

    public function find(string $id): array
    {
        return []; // Pas de fonction find() directe pour l'IA
    }
}