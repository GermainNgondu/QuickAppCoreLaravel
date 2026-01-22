<?php

namespace App\Core\Domains\Media\Actions\Collections;

use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Core\Domains\Media\Models\MediaCollection;


class DeleteCollectionAction
{
    use AsAction;

    public function handle(MediaCollection $collection): JsonResponse
    {
         if (in_array($collection->slug, ['library', 'avatars'])) {
            abort(403, "Impossible de supprimer une collection système.");
        }

        $collection->delete();

        return response()->json(['message'=> 'La collection est supprimée']);
    }
}