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
     * @param Media $media
     * @return JsonResponse
     */
    public function handle(Media $media): JsonResponse
    {
        return response()->json(MediaData::from($media));
    }
}