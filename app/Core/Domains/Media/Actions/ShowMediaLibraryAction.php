<?php

namespace App\Core\Domains\Media\Actions;

use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;

class ShowMediaLibraryAction extends BaseAction
{
    public function asController()
    {
        return UIPage::make('Médiathèque')
            ->type('page')
            ->options([
                'endpoint' => route('admin.media.index'),
                'upload_url' => route('admin.media.upload'),
                'component' => 'Core::media/MediaManagerList'
            ])
            ->render();
    }
}