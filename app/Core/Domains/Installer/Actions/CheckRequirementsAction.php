<?php

namespace App\Core\Domains\Installer\Actions;

use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;

class CheckRequirementsAction extends BaseAction
{

    public function handle(): array
    {
        return [
            'php' => version_compare(PHP_VERSION, '8.2.0', '>='),
            'extensions' => [
                'pdo' => extension_loaded('pdo'),
                'mbstring' => extension_loaded('mbstring'),
                'openssl' => extension_loaded('openssl'),
            ],
            'permissions' => [
                'storage' => is_writable(storage_path()),
                'bootstrap/cache' => is_writable(base_path('bootstrap/cache')),
            ]
        ];
    }

    public function asController()
    {
        $requirements = $this->handle();

        $isReady = !in_array(false, array_merge([$requirements['php']], array_values($requirements['extensions']), array_values($requirements['permissions'])));

        if (request()->isMethod('post') && $isReady) 
        {
            session()->put('installer_step', 2);
            return response()->json(['redirect' => route('installer.master')]);
        }

        return UIPage::make('Vérifications Système')
            ->type('wizard')
            ->data([
                'step' => 1,
                'requirements' => $requirements,
                'isReady' => $isReady
            ])
            ->options(['component' => 'Core::installer/InstallerWizard'])
            ->render();
    }
}