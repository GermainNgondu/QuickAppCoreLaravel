<?php

namespace App\Core\Domains\Installer\Actions;

use Exception;
use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;


class RunMigrationsAction extends BaseAction
{
    public function handle(): void
    {

    }

    public function asController()
    {
        $migrator = app('migrator');
        
        $repository = $migrator->getRepository();

        // Initialisation du repository
        if (!$repository->repositoryExists()) {
            $repository->createRepository();
        }
        if (request()->isMethod('get')) {
            return UIPage::make('Installation des tables')
                ->type('wizard')
                ->data(['step' => 3])
                ->options(['component' => 'Core::installer/InstallerWizard'])
                ->render();
        }
        // Recuperation des chemins
        $files = $migrator->getMigrationFiles($migrator->paths());

        // Récupérer les migrations déjà effectuées
        $ran = $repository->getRan();
        
        // Calculer celles qui restent à faire
        $pending = array_diff(array_keys($files), $ran);
        $totalPending = count($pending);

        if ($totalPending === 0) {
            // Lancer les seeders de base si nécessaire
            $this->runModuleSeeders();

            session()->put('installer_step', 4);

            return response()->json(['finished' => true,'next_step' => 4]);
        }

        if (request()->has('status')) 
        {
            return response()->json(['total' => $totalPending]);
        }

        // Exécuter la migration suivante (une seule à la fois pour le feedback)
        $nextMigration = head($pending);
        $migrator->runPending([$files[$nextMigration]]);
            
        return response()->json([
                'success' => true,
                'migrated' => $nextMigration,
                'remaining' => $totalPending - 1
            ]);
    }

        /**
     * Scans and executes all Seeders.
     */
    private function runModuleSeeders(): void
    {
        $directories = [
            database_path('seeders'),          // Laravel standard
            base_path('app/Core/Infrastructure/Database/Seeders'), // Core
        ];

        // Dynamic modules
        foreach (['Features', 'Plugins', 'Themes'] as $module) {
            $parent = base_path("app/{$module}");
            if (File::isDirectory($parent)) {
                foreach (glob($parent . '/*', GLOB_ONLYDIR) as $dir) {
                    $path = $dir . '/Infrastructure/Database/Seeders';
                    if (File::isDirectory($path)) {
                        $directories[] = $path;
                    }
                }
            }
        }

        foreach ($directories as $dir) {
            if (!File::isDirectory($dir)) continue;

            $files = File::allFiles($dir);
            
            /** @var \SplFileInfo $file */
            foreach ($files as $file) {
                // Only take PHP files ending with Seeder.php
                if (str_ends_with($file->getFilename(), 'Seeder.php')) {
                    $fullClassName = $this->getClassNamespaceFromFile($file->getRealPath());
                    
                    if ($fullClassName) {
                        $this->runSeeder($fullClassName);
                    }
                }
            }
        }
    }

    /**
     * Executes a specific seeder.
     */
    private function runSeeder(string $className): void
    {
        try {
            Artisan::call('db:seed', [
                '--class' => $className,
                '--force' => true
            ]);
            Log::info("Seeder executed : {$className}");
        } catch (Exception $e) {
            Log::error("Error seeding {$className} : " . $e->getMessage());
        }
    }

    /**
     * Extracts the complete namespace of a PHP file.
     */
    private function getClassNamespaceFromFile(string $filePath): ?string
    {
        $content = File::get($filePath);
        
        // Regex to find "namespace X;" and "class Y"
        if (preg_match('/namespace\s+(.+?);/', $content, $nsMatch) && 
            preg_match('/class\s+(\w+)/', $content, $classMatch)) {
            
            return $nsMatch[1] . '\\' . $classMatch[1];
        }

        return null;
    }
}