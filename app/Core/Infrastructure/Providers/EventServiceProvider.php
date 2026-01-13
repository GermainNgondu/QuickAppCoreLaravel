<?php

namespace App\Core\Infrastructure\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Cartographie des événements et de leurs écouteurs (Listeners).
     */
    protected $listen = [

    ];

    /**
     * Démarrage du service d'événements.
     */
    public function boot(): void
    {
        parent::boot();
    }

    /**
     * Déterminer si les événements et les écouteurs doivent être découverts automatiquement.
     * Très utile pour votre architecture modulaire !
     */
    public function shouldDiscoverEvents(): bool
    {
        return true;
    }

    /**
     * Indique à Laravel où chercher les événements auto-découverts.
     */
    protected function discoverEventsWithin(): array
    {
        return [
            app_path('Core/Domains'),
            app_path('Features'),
        ];
    }
}