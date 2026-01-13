<?php

namespace App\Core\Domains\Media\Actions;


use Illuminate\Http\JsonResponse;
use App\Core\Domains\Media\Models\Media;
use Lorisleiva\Actions\Concerns\AsAction;

class RestoreMediaAction
{
    use AsAction;

    public function rules(): array
    {
        return [
            'ids'   => 'required|array',
            'ids.*' => 'required', // On valide manuellement dans le handle pour les éléments trashed
        ];
    }

    /**
     * Restaure les médias qui étaient dans la corbeille.
     */
    public function handle(array $ids): void
    {
        // On cible uniquement les médias supprimés (onlyTrashed)
        Media::onlyTrashed()
            ->whereIn('id', $ids)
            ->restore();
    }

    public function asController(): JsonResponse
    {
        $this->handle(request()->input('ids'));

        return response()->json([
            'message' => 'Les médias ont été restaurés avec succès.'
        ]);
    }
}