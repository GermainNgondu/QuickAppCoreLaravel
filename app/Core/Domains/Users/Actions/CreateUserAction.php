<?php

namespace App\Core\Domains\Users\Actions;

use App\Core\Framework\UI\UIPage;
use App\Core\Domains\Users\Models\User;
use App\Core\Domains\Users\Data\UserData;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateUserAction
{
    use AsAction;

    public function handle(UserData $data): User
    {
        return User::create($data->toArray());
    }

    public function asController(UserData $data)
    {
        if (request()->isMethod('get')) {
            return UIPage::make('Nouveau membre')
                ->type('form')
                ->options([
                    'component' => 'Core::users/UserForm',
                    'submit_url' => route('admin.users.store'),
                    'method' => 'POST'
                ])
                ->render();
        }

        $this->handle($data);

        return response()->json([
            'message' => 'Utilisateur créé avec succès', 
            'redirect' => route('admin.users.index')
        ]);
    }
}