<?php

namespace App\Core\Domains\Media\Providers;

use App\Core\Support\Facades\Menu;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Core\Domains\Media\MediaManager;
use App\Core\Domains\Media\Models\Media;

class MediaServiceProvider extends ServiceProvider
{
    /**
     * Enregistrement des services (Singletons).
     */
    public function register(): void
    {
        // On enregistre le MediaManager en Singleton pour qu'il garde 
        // les instances de drivers en mémoire durant la requête.
        $this->app->singleton(MediaManager::class, function ($app) {
            return new MediaManager();
        });
    }

    /**
     * Amorçage du domaine (Routes, Menu, Migrations).
     */
    public function boot(): void
    {
        $this->registerRoutes();
        $this->registerMenu();
        $this->registerCustomMediaModel();
    }

    /**
     * Charge les routes web du domaine.
     */
    protected function registerRoutes(): void
    {
        Route::middleware('web')
            ->group(__DIR__ . '/../Routes/web.php');
    }

    /**
     * Inscrit le domaine dans le MenuManager global.
     */
    protected function registerMenu(): void
    {
        Menu::register([
            'id'    => 'media',
            'label' => 'Médiathèque',
            'icon'  => 'Image',
            'route' => 'admin.media.index',
            'order' => 30,
        ]);
    }

    /**
     * Force Spatie MediaLibrary à utiliser notre modèle étendu.
     */
    protected function registerCustomMediaModel(): void
    {
        config(['media-library.media_model' => Media::class]);
    }
}