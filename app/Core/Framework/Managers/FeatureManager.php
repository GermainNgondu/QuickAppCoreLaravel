<?php

namespace App\Core\Framework\Managers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Collection;

class FeatureManager
{
    protected const CACHE_KEY = 'platform_features_detailed_list';
    protected Collection $features;

    public function __construct()
    {
        // Cache "Forever" pour éviter les lectures disques et les décodages JSON
        $this->features = Cache::rememberForever(self::CACHE_KEY, function () {
            return $this->discoverFeatures();
        });
    }

    /**
     * Scanne les dossiers et décode les fichiers feature.json
     */
    protected function discoverFeatures(): Collection
    {
        $path = app_path('Features');

        if (!File::isDirectory($path)) return collect();

        return collect(File::directories($path))
            ->map(function ($directory) {
                $jsonPath = $directory . '/feature.json';
                $folderName = basename($directory);

                // Si le fichier JSON existe, on le lit, sinon on met des valeurs par défaut
                $metadata = File::exists($jsonPath) 
                    ? json_decode(File::get($jsonPath), true) 
                    : $this->getDefaultMetadata($folderName);

                return array_merge($metadata, [
                    'path' => $directory,
                    'folder' => $folderName
                ]);
            })
            ->keyBy('id'); // On indexe par l'ID défini dans le JSON
    }

    /**
     * Fallback si le fichier feature.json est manquant
     */
    protected function getDefaultMetadata(string $folderName): array
    {
        return [
            'id' => strtolower($folderName),
            'name' => $folderName,
            'version' => '0.0.1',
            'enabled' => true,
            'description' => 'Aucune description fournie.',
            'icon' => 'puzzle-piece'
        ];
    }

    /**
     * Vérifie si une feature est activée
     */
    public function isEnabled(string $id): bool
    {
        return $this->features->has($id) && $this->features->get($id)['enabled'] === true;
    }

    public function getEnabled(): Collection
    {
        return $this->features->where('enabled', true)->sortBy('order');
    }
    
    /**
     * Récupère les métadonnées d'une feature précise
     */
    public function getMetadata(string $id): ?array
    {
        return $this->features->get($id);
    }

    public function getAll(): Collection
    {
        return $this->features;
    }

    public function flushCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}