<?php

namespace App\Core\Domains\Admin\Actions\Settings;

use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;
use App\Core\Domains\Admin\Models\Setting;

class ShowSettingsAppAction extends BaseAction
{

    public function asController()
    {
        return UIPage::make('Configuration Générale')
                ->type('form')
                ->data([
                    'settings' => Setting::where('group', 'app')->pluck('value', 'key')->toArray(),
                ])
                ->options([
                    'title'=> ucfirst(__('settings')),
                    'component' => 'Core::admin/SettingsForm',
                    'submit_url' => route('admin.settings.update'),
                    'method' => 'PUT'
                ])
                ->render();
    }
}