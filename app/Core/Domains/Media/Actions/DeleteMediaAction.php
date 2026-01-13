<?php

namespace App\Core\Domains\Media\Actions;

use App\Core\Domains\Media\Models\Media;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteMediaAction
{
    use AsAction;

    public function handle(Media $media)
    {
        // Spatie gère automatiquement la suppression des fichiers physiques et des conversions
        return $media->delete();
    }

    public function asController(Media $media)
    {
        $this->handle($media);

        return response()->json([
            'message' => 'Média supprimé définitivement',
            'redirect' => route('admin.media.index')
        ]);
    }
}