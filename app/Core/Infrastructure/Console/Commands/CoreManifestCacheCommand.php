<?php

namespace App\Core\Infrastructure\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use App\Core\Infrastructure\Providers\CoreServiceProvider;

class CoreManifestCacheCommand extends Command
{
    protected $signature = 'core:cache';
    protected $description = 'Génère le manifeste de découverte des modules pour QuickAppCore';

    public function handle()
    {
        $this->info('Scanning modules...');

        $serviceProvider = new CoreServiceProvider(app());
        $method = new \ReflectionMethod(CoreServiceProvider::class, 'scanModules');
        $method->setAccessible(true);
        $manifest = $method->invoke($serviceProvider);

        $path = base_path('bootstrap/cache/core_manifest.php');

        $content = '<?php return ' . var_export($manifest, true) . ';';
        File::put($path, $content);

        $this->info("Manifeste généré avec succès dans : {$path}");
    }
}