<?php

namespace App\Core\Domains\Users\Actions;

use App\Core\Framework\UI\UIPage;
use App\Core\Domains\Users\Models\User;
use App\Core\Domains\Users\Data\UserData;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateUserAction
{
    use AsAction;

    public function handle(User $user, UserData $data): void
    {
        // On filtre pour ne pas écraser le mot de passe s'il est vide
        $updateData = array_filter($data->toArray());
        $user->update($updateData);
    }

    public function asController(User $user, UserData $data)
    {
        if (request()->isMethod('get')) {
            return UIPage::make("Modifier : {$user->name}")
                ->type('form')
                ->data([
                    'user' => $user->toArray() // Injecté dans les props du composant React
                ])
                ->options([
                    'component' => 'Core::users/UserForm',
                    'submit_url' => route('admin.users.update', $user->id),
                    'method' => 'PUT'
                ])
                ->render();
        }

        $this->handle($user, $data);

        return response()->json([
            'message' => 'Mise à jour réussie',
            'redirect' => route('admin.users.index')
        ]);
    }
}