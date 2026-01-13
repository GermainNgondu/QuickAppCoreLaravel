<?php

namespace App\Core\Framework\Resources\Actions;

use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;
use App\Core\Framework\UI\View\Infolist;
use App\Core\Framework\Resources\BaseResource;

class ShowResourceAction extends BaseAction
{
    public function handle(BaseResource $resource, $id)
    {
        $model = $resource->findOrNew($id);
        $dataClass = $resource->dataClass();
        
        $data = $dataClass::from($model);

        return UIPage::make($resource->title())
            ->type('view')
            ->schema($resource->infolist(Infolist::make('info_list'))->toArray())
            ->data($data)
            ->render();
    }
}