<?php

namespace App\Core\Domains\Users\Actions;

use App\Core\Domains\Users\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteUserAction
{
    use AsAction;

    public function handle(User $user): void
    {
        if ($user->id === auth()->id()) {
            throw new \Exception("Vous ne pouvez pas supprimer votre propre compte.");
        }
        $user->delete();
    }

    public function asController(User $user)
    {
        try {
            $this->handle($user);
            return response()->json(['message' => 'Utilisateur supprimé']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 403);
        }
    }
}