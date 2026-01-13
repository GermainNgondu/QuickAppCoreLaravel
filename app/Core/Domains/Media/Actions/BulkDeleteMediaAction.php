<?php

namespace App\Core\Domains\Media\Actions;

use App\Core\Domains\Media\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;

class BulkDeleteMediaAction
{
    use AsAction;

    public function rules(): array
    {
        return [
            'ids'   => 'required|array',
            'ids.*' => 'required|exists:media,id',
        ];
    }

    /**
     * Supprime (Soft Delete) les médias sélectionnés.
     */
    public function handle(array $ids): void
    {
        Media::destroy($ids);
    }

    public function asController(): JsonResponse
    {
        $this->handle(request()->input('ids'));

        return response()->json([
            'message' => 'Les médias ont été placés dans la corbeille.'
        ]);
    }
}