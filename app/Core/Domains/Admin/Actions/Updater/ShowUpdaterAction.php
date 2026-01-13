<?php

namespace App\Core\Domains\Admin\Actions\Updater;

use App\Core\Framework\UI\UIPage;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowUpdaterAction
{
    use AsAction;

    public function asController()
    {
        return UIPage::make('Updater')
            ->type('page')
            ->options([
                'title' => ucfirst(__('Updater')),
                'component' => 'Core::admin/Updater'
            ])
            ->render();
    }
}