<?php

namespace App\Core\Domains\Installer\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Core\Support\Middleware\InstallerLocalization;

class InstallerServiceProvider extends ServiceProvider
{
    /**
     * Enregistrement des services.
     */
    public function register(): void
    {
    }

    /**
     * Démarrage des services.
     */
    public function boot(): void
    {
        $this->registerRoutes();
    }

    protected function registerRoutes(): void
    {
        if (!file_exists(storage_path('installed'))) 
        {
            Route::middleware(['web'])->prefix('install')->as('installer.')->group(__DIR__ . '/../Routes/web.php');
        }
    }
}