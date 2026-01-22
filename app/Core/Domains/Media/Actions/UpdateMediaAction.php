<?php

namespace App\Core\Domains\Media\Actions;

use Illuminate\Http\JsonResponse;
use App\Core\Domains\Media\Models\Media;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Core\Domains\Media\Data\UpdateMediaData;

class UpdateMediaAction
{
    use AsAction;

    public function handle(Media $media, UpdateMediaData $data): JsonResponse
    {
        $media->name = $data->name;
        $media->setCustomProperty('alt_text', $data->alt_text);
        $media->setCustomProperty('description', $data->description);
        $media->save();

        return response()->json([
            'message' => 'Média mis à jour avec succès',
            'refresh' => true
        ]);
    }
}