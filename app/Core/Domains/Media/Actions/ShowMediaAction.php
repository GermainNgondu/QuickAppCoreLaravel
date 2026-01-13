<?php

namespace App\Core\Domains\Media\Actions;

use App\Core\Domains\Media\Models\Media;
use App\Core\Domains\Media\Data\MediaData;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowMediaAction
{
    use AsAction;

    /**
     * Gère la requête de récupération d'un média unique.
     * * @param Media $media Le modèle média injecté automatiquement via l'ID dans l'URL
     * @return JsonResponse
     */
    public function handle(Media $media): MediaData
    {
        // On retourne le DTO MediaData qui formate l'URL, le type et les métadonnées
        return MediaData::from($media);
    }

    /**
     * Interface pour l'utilisation en tant que contrôleur.
     */
    public function asController(Media $media): JsonResponse
    {
        return response()->json($this->handle($media));
    }
}