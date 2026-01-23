<?php

namespace App\Core\Infrastructure\Console\Commands;

use Illuminate\Support\Str;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;


class CoreMakeFeatureCommand extends Command
{
    protected $signature = 'core:make-feature {name : Le nom du feature}';
    protected $description = 'Génère la structure complète d\'un nouveau feature dans Core/Features';

    public function handle()
    {
        $name = ucfirst($this->argument('name'));
        $path = app_path("Core/Features/{$name}");

        if (File::exists($path)) {
            $this->error("Le feature {$name} existe déjà !");
            return;
        }

        $this->info("Création du feature : {$name}...");

        // 1. Création des dossiers
        $directories = [
            'Actions', 'Data', 'Models', 'Providers', 'Routes', 
            'Resources', 'Database/Migrations', 'Database/Seeders'
        ];

        foreach ($directories as $dir) {
            File::makeDirectory("{$path}/{$dir}", 0755, true);
        }

        // 2. Génération du module.json
        File::put("{$path}/module.json", json_encode([
            'id' => Str::snake($name),
            'name' => $name,
            'active' => true,
            'version' => '1.0.0'
        ], JSON_PRETTY_PRINT));

        // 3. Génération du ServiceProvider
        $this->generateProvider($name, $path);

        // 4. Génération des fichiers de Routes
        File::put("{$path}/Routes/web.php", "<?php\n\nuse Illuminate\Support\Facades\Route;");
        File::put("{$path}/Routes/api.php", "<?php\n\nuse Illuminate\Support\Facades\Route;");

        $this->info("Domaine {$name} créé avec succès !");
        $this->warn("N'oubliez pas de lancer 'php artisan core:cache' pour enregistrer le nouveau domaine.");
    }

    protected function generateProvider($name, $path)
    {
        $content = "<?php\n\nnamespace App\Features\\{$name}\Providers;\n\nuse Illuminate\Support\ServiceProvider;\n\nclass {$name}ServiceProvider extends ServiceProvider\n{\n    public function register()\n    {\n        //\n    }\n\n    public function boot()\n    {\n        //\n    }\n}";
        File::put("{$path}/Providers/{$name}ServiceProvider.php", $content);
    }
}