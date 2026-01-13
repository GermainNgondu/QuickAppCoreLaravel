<?php

namespace App\Core\Domains\Users\Actions;

use App\Core\Framework\UI\UIPage;
use App\Core\Domains\Users\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class ListUsersAction
{
    use AsAction;

    public function asController()
    {
        // Si la requête attend du JSON (API), on renvoie les données
        if (request()->wantsJson() && request()->has('draw')) {
            return $this->getPaginatedData();
        }

        // Sinon, on renvoie la structure de la page
        return UIPage::make('Gestion des Utilisateurs')
            ->type('table')
            ->schema([
                ['name' => 'id', 'label' => 'ID', 'sortable' => true],
                ['name' => 'name', 'label' => 'Nom Complet', 'sortable' => true, 'searchable' => true],
                ['name' => 'email', 'label' => 'Email', 'searchable' => true],
                ['name' => 'role', 'label' => 'Rôle', 'type' => 'badge'],
                ['name' => 'actions', 'label' => 'Actions', 'type' => 'actions_dropdown'],
            ])
            ->options([
                'endpoint' => route('admin.users.index'),
                'create_url' => route('admin.users.create'),
            ])
            ->render();
    }

    protected function getPaginatedData()
    {
        $query = User::query();

        if ($search = request()->input('search')) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
        }

        return $query->paginate(request()->input('per_page', 10));
    }
}