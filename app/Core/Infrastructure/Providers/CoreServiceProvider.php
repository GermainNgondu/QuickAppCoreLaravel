<?php

namespace App\Core\Infrastructure\Providers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Core\Framework\Resources\ResourceRegistry;
use App\Core\Support\Middleware\RedirectToInstaller;
use App\Core\Framework\Managers\{HookManager, FeatureManager, MenuManager, IntentManager};

class CoreServiceProvider extends ServiceProvider
{
    protected const CACHE_KEY = 'core_platform_manifest';

    /**
     * register : Enregistrement des services et découverte.
     */
    public function register(): void
    {
        $this->app['router']->aliasMiddleware('check.installed', RedirectToInstaller::class);

        // Enregistrement des Singletons du Framework
        $this->app->singleton(FeatureManager::class, fn() => new FeatureManager());
        $this->app->singleton(HookManager::class, fn() => new HookManager());
        $this->app->singleton(IntentManager::class, fn() => new IntentManager());
        $this->app->singleton(ResourceRegistry::class, fn() => new ResourceRegistry());
        $this->app->singleton(MenuManager::class, function ($app) {
            return new MenuManager($app->make(FeatureManager::class), $app->make(HookManager::class));
        });

        // Chargement du Manifeste (depuis le cache ou scan)
        $manifest = $this->getManifest();

        // Enregistrement dynamique des Providers découverts
        foreach ($manifest['providers'] as $provider) {
            $this->app->register($provider);
        }

        // Enregistrement des Providers internes fixes
        $this->app->register(EventServiceProvider::class);

        // Fusion des configurations Spatie/Core
        $this->mergeSystemConfigs();
    }

    /**
     * boot : Initialisation des composants.
     */
    public function boot(): void
    {
        $this->app['router']->pushMiddlewareToGroup('web', RedirectToInstaller::class);
        
        $manifest = $this->getManifest();

        // 1. Chargement des ressources globales du Core
        $this->loadMigrationsFrom(app_path('Core/Infrastructure/Database/Migrations'));
        $this->loadViewsFrom(app_path('Core/Resources/views'), 'core');
        $this->loadTranslationsFrom(app_path('Core/Resources/lang'), 'core');

        Route::prefix('api')->middleware('api')->group(app_path('Core/Infrastructure/Routes/api.php'));

        // 2. Chargement des ressources découvertes (Routes & Migrations de domaines/features)
        foreach ($manifest['routes'] as $route) {
            $this->loadRoutes($route);
        }

        foreach ($manifest['migrations'] as $migrationPath) {
            $this->loadMigrationsFrom($migrationPath);
        }

        // 3. Enregistrement des Resources dans le Registry
        $registry = $this->app->make(ResourceRegistry::class);
        foreach ($manifest['resources'] as $resource) {
            $registry->register($resource);
        }
    }

    /**
     * Récupère le manifeste depuis le cache ou lance le scan.
     */
    protected function getManifest(): array
    {
        // En local, on scanne à chaque fois pour le confort de dev.
        // En prod, on utilise le cache "forever".
        if (app()->environment('local')) {
            return $this->scanModules();
        }

        return Cache::rememberForever(self::CACHE_KEY, fn() => $this->scanModules());
    }

    /**
     * Scanne les dossiers Core/Domains et Features pour construire le plan de l'application.
     */
    protected function scanModules(): array
    {
        $manifest = [
            'providers'  => [],
            'routes'     => [],
            'migrations' => [],
            'resources'  => [],
            'seeders'    => [],
        ];

        // On scanne les deux dossiers racines
        $paths = [app_path('Core/Domains'), app_path('Features')];

        foreach ($paths as $root) {
            if (!File::isDirectory($root)) continue;

            foreach (File::directories($root) as $modulePath) {
                $id = basename($modulePath);

                // --- Providers ---
                if (File::isDirectory($modulePath . '/Providers')) {
                    foreach (File::files($modulePath . '/Providers') as $file) {
                        $manifest['providers'][] = $this->getNamespace($file->getPathname());
                    }
                }

                // --- Routes ---
                if (File::exists($modulePath . '/Routes/web.php')) {
                    $manifest['routes'][] = ['path' => $modulePath . '/Routes/web.php', 'type' => 'web', 'prefix' => null];
                }
                if (File::exists($modulePath . '/Routes/api.php')) {
                    $manifest['routes'][] = ['path' => $modulePath . '/Routes/api.php', 'type' => 'api', 'prefix' => 'api/' . strtolower($id)];
                }

                // --- Migrations ---
                if (File::isDirectory($modulePath . '/Database/Migrations')) {
                    $manifest['migrations'][] = $modulePath . '/Database/Migrations';
                }

                //---Seeders ---
                $seederPath = $modulePath . '/Database/Seeders';
                if (File::isDirectory($seederPath)) {
                    foreach (File::files($seederPath) as $file) {
                        // On enregistre le Namespace complet du Seeder
                        $manifest['seeders'][] = $this->getNamespace($file->getPathname());
                    }
                }

                // --- Resources ---
                if (File::isDirectory($modulePath . '/Resources')) {
                    foreach (File::allFiles($modulePath . '/Resources') as $file) {
                        if (str_ends_with($file->getFilename(), 'Resource.php')) {
                            $manifest['resources'][] = $this->getNamespace($file->getPathname());
                        }
                    }
                }
            }
        }

        return $manifest;
    }

    /**
     * Charge les fichiers de routes selon leur type.
     */
    protected function loadRoutes(array $routeData): void
    {
        $router = \Route::middleware($routeData['type']);
        
        if ($routeData['prefix']) {
            $router->prefix($routeData['prefix']);
        }

        $router->group($routeData['path']);
    }

    /**
     * Fusionne les configs de Core/Infrastructure/Config.
     */
    protected function mergeSystemConfigs(): void
    {
        $configPath = app_path('Core/Infrastructure/Config');
        if (!File::isDirectory($configPath)) return;

        foreach (File::files($configPath) as $file) {
            $this->mergeConfigFrom($file->getPathname(), $file->getBasename('.php'));
        }
    }

    /**
     * Convertit un chemin de fichier en Namespace PSR-4.
     */
    protected function getNamespace(string $path): string
    {
        $class = str_replace([app_path(), '.php', '/'], ['App', '', '\\'], $path);
        return $class;
    }
}