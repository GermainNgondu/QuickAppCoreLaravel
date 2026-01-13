<?php

namespace App\Core\Domains\Installer\Actions;

use Exception;
use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Artisan;
use App\Core\Domains\Installer\Data\DatabaseConfigData;

class SetupDatabaseAction extends BaseAction
{

    /**
     * Logique principale : Test de connexion et écriture du .env
     */
    public function handle(DatabaseConfigData $data): void
    {
        // 1. Tester si la connexion fonctionne avant d'enregistrer
        $this->testConnection($data);

        // 2. Mettre à jour le fichier .env
        $this->updateEnvFile($data);

        // 3. Vider le cache de configuration pour appliquer les changements
        Artisan::call('config:clear');
    }

    /**
     * Interface pour le contrôleur (React)
     */
    public function asController()
    {
        if (request()->isMethod('post')) {
            
            // Validation automatique via le DTO
            $data = DatabaseConfigData::from(request()->all());

            try {

                $this->handle($data);

                session()->put('installer_step', 3);

                return response()->json([
                    'message' => __('Connexion établie et configuration enregistrée.'),
                    'redirect' => route('installer.master')
                ]);
            } catch (Exception $e) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'database' => ["Échec de connexion : " . $e->getMessage()],
                ]);
            }
            
        }

        return UIPage::make('Base de données')
            ->type('wizard')
            ->data(['step' => 2])
            ->options(['component' => 'Core::installer/InstallerWizard'])
            ->render();
    }

    /**
     * Test dynamique de la connexion PDO
     */
    protected function testConnection(DatabaseConfigData $data): void
    {
        // On crée une configuration temporaire pour le test
        $config = [
            'driver' => $data->connection,
            'database' => $data->connection === 'sqlite'
                ? base_path($data->database)
                : $data->database,
            'host' => $data->host,
            'port' => $data->port,
            'username' => $data->username,
            'password' => $data->password,
            'prefix' => '',
        ];

        // Pour SQLite, on vérifie/crée le fichier si nécessaire
        if ($data->connection === 'sqlite') {
            $path = base_path($data->database);
            if (!file_exists($path)) {
                touch($path);
            }
        }

        // On injecte la config dans Laravel temporairement
        Config::set('database.connections.install_test', $config);

        // On tente d'ouvrir la connexion
        DB::purge('install_test');
        DB::connection('install_test')->getPdo();
    }

    /**
     * Écriture physique dans le fichier .env
     */
    protected function updateEnvFile(DatabaseConfigData $data): void
    {
        app(WriteDatabaseEnvironmentAction::class)->handle($data);
    }
}