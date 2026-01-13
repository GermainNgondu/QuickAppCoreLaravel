<?php

namespace App\Core\Domains\Media\Actions;

use Illuminate\Http\JsonResponse;
use App\Core\Domains\Media\Models\Media;
use Lorisleiva\Actions\Concerns\AsAction;

class MoveMediaCollectionAction
{
    use AsAction;

    /**
     * Règles de validation pour le déplacement de médias.
     */
    public function rules(): array
    {
        return [
            'ids'        => 'required|array',
            'ids.*'      => 'required|exists:media,id',
            'collection' => 'required|string|max:100',
        ];
    }

    /**
     * Logique principale : Modification de la collection en base de données.
     */
    public function handle(array $ids, string $collection): void
    {
        $medias = Media::whereIn('id', $ids)->get();

        foreach ($medias as $media) {
            $media->collection_name = $collection;
            $media->save();
        }
    }

    /**
     * Interface pour l'appel via l'API.
     */
    public function asController(): JsonResponse
    {
        $this->handle(
            request()->input('ids'),
            request()->input('collection')
        );

        return response()->json([
            'message' => 'Les médias ont été déplacés avec succès.'
        ]);
    }
}