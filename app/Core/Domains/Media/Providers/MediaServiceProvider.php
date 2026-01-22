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
        $this->app->singleton(MediaManager::class, function ($app) {
            return new MediaManager();
        });
    }

    /**
     * Amorçage du domaine (Routes, Menu, Migrations).
     */
    public function boot(): void
    {
        $this->registerMenu();
        $this->registerCustomMediaModel();
    }

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