<?php

namespace App\Core\Domains\Media\Actions\Collections;

use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Core\Domains\Media\Models\MediaCollection;
use App\Core\Domains\Media\Data\MediaCollectionData;

class UpdateCollectionAction
{
    use AsAction;

    public function handle(MediaCollection $collection, MediaCollectionData $data): JsonResponse
    {
        if (in_array($collection->slug, ['library', 'avatars'])) {
            abort(403, "Impossible de modifier une collection système.");
        }
        $attributes = $data->toArray();

        unset($attributes['id']);

        $collection->update($attributes);
        
        $collection->refresh();

        return response()->json(MediaCollectionData::from($collection));
    }
}