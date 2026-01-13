<?php

namespace App\Core\Domains\Admin\Actions;

use App\Core\Framework\UI\UIPage;
use App\Core\Domains\Users\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowDashboardAction
{
    use AsAction;

    public function asController()
    {
        return UIPage::make('Tableau de Bord')
            ->type('admin')
            ->data([
                'stats' => [
                    'users_count' => User::count(),
                    'new_users_today' => User::whereDate('created_at', today())->count(),
                    // Vous ajouterez d'autres stats ici au fur et à mesure
                ],
                'recent_users' => User::latest()->take(5)->get()
            ])
            ->options([
                'title'=> ucfirst(__('dashboard')),
                'component' => 'Core::admin/Dashboard'
            ])
            ->render();
    }
}