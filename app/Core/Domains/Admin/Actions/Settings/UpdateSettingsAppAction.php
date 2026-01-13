<?php

namespace App\Core\Domains\Admin\Actions\Settings;

use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;
use Illuminate\Support\Facades\DB;
use App\Core\Domains\Admin\Models\Setting;
use App\Core\Domains\Admin\Data\SettingsAppData;

class UpdateSettingsAppAction extends BaseAction
{
    public function handle(SettingsAppData $data)
    {
        // On utilise une transaction pour être sûr que tout est sauvegardé
        DB::transaction(function () use ($data) {
            foreach ($data->toArray() as $key => $value) {
                // Sauvegarde en base de données
                Setting::set($key, $value,'app');
            }
        });

        return response()->json([
            'message' => 'Configuration mise à jour avec succès.',
            'refresh' => true 
        ]);
    }

    public function asController()
    {
        // SI GET : On affiche le formulaire avec les valeurs actuelles
        if (request()->isMethod('get')) {
            return UIPage::make('Configuration Générale')
                ->type('form')
                ->data([
                    // Ici on récupère les valeurs depuis config() ou la DB
                    'settings' => Setting::pluck('value', 'key')->toArray(),
                ])
                ->options([
                    'title'=> ucfirst(__('settings')),
                    'component' => 'Core::admin/SettingsForm',
                    'submit_url' => route('admin.settings.update'),
                    'method' => 'PUT'
                ])
                ->render();
        }

        // SI PUT : On valide via le DTO
        $data = SettingsAppData::validateAndCreate(request()->all());

        return $this->handle($data);
    }
}