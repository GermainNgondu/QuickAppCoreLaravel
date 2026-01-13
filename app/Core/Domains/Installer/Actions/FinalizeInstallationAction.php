<?php

namespace App\Core\Domains\Installer\Actions;

use Illuminate\Support\Str;
use App\Core\Actions\BaseAction;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;
use App\Core\Framework\Managers\EnvManager;


class FinalizeInstallationAction extends BaseAction
{
    public function handle(): void
    {
        // Set URL
        $uri = Str::beforeLast(request()->getUri(), '/install');
        EnvManager::init()->set('APP_URL', $uri);
        
        // Generate the application key if necessary
        Artisan::call('key:generate', ['--force' => true]);

        // Create the installation indicator file
        File::put(storage_path('framework/installed.lock'), date('Y-m-d H:i:s'));

        // Clear all caches
        Artisan::call('config:cache');
        Artisan::call('route:cache');

        session()->forget([
            'installer_step',
            'installer_locale',
        ]);
    }
}