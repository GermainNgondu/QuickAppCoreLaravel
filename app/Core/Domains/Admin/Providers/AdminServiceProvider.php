<?php

namespace App\Core\Domains\Admin\Providers;


use App\Core\Support\Facades\Menu;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Core\Domains\Admin\Models\Setting;
use App\Core\Support\Facades\CommandPalette;
use App\Core\Framework\Managers\CommandManager;

class AdminServiceProvider extends ServiceProvider
{
    /**
     * Enregistre les services du domaine Admin.
     */
    public function register()
    {
        $this->app->singleton(CommandManager::class);
    }

    /**
     * Amorce les services du domaine Admin.
     */
    public function boot()
    {
        if (app()->bound('db') && \Schema::hasTable('settings')) {
            config([
                'app.name' => Setting::get('app_name', config('app.name')),
                'mail.from.address' => Setting::get('contact_email', config('mail.from.address')),
            ]);
        }

        $this->bootCommands();
        $this->registerRoutes();
        $this->registerMigrations();

        Menu::register([
            'label' => ucfirst(__('dashboard')),
            'icon'  => 'LayoutDashboard',
            'route' => 'admin.dashboard',
            'order' => 1,
        ]);
    }

    /**
     * Charge les routes du domaine.
     */
    protected function registerRoutes()
    {
        Route::middleware('web')
            ->group(__DIR__ . '/../Routes/web.php');

        Route::prefix('api/admin')
            ->middleware('api')
            ->group(__DIR__ . '/../Routes/api.php');
    }

    /**
     * Charge les migrations si elles existent.
     */
    protected function registerMigrations()
    {
        if ($this->app->runningInConsole()) {
            $this->loadMigrationsFrom(__DIR__ . '/../Migrations');
        }
    }

    private function bootCommands(): void
    {
        CommandPalette::register([
            'label' => 'Tableau de bord',
            'icon' => 'LayoutDashboard',
            'type' => 'nav',
            'value' => '/admin/dashboard',
            'group' => 'Navigation'
        ]);
        CommandPalette::register([
            'label' => 'Paramètres',
            'icon' => 'Settings',
            'type' => 'nav',
            'value' => '/admin/settings',
            'group' => 'Navigation'
        ]);

        CommandPalette::register([
            'label' => 'Vider le cache',
            'icon' => 'Trash2',
            'type' => 'intent',
            'value' => 'core.clear_cache',
            'group' => 'Système'
        ]);
        CommandPalette::register([
            'label' => 'Optimiser le système',
            'icon' => 'Zap',
            'type' => 'intent',
            'value' => 'core.optimize',
            'group' => 'Système'
        ]);
    }
}