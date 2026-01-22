<?php

namespace App\Core\Domains\Media\Actions;

use App\Core\Domains\Media\Models\Media;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteMediaAction
{
    use AsAction;

    public function handle(Media $media): JsonResponse
    {
        $media->delete();

        return response()->json([
            'message' => 'Média supprimé définitivement',
            'redirect' => route('admin.media.index')
        ]);
    }
}