<?php

namespace App\Core\Framework\Resources\Actions;

use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;
use App\Core\Framework\UI\Table\Table;
use App\Core\Framework\Resources\BaseResource;

class ListResourceAction extends BaseAction
{
    /**
     * @param BaseResource $resource L'instance de la ressource
     */
    public function handle(BaseResource $resource)
    {
        $dataClass = $resource->dataClass();

        $pagination = $resource->getQuery()->paginate(request('per_page', 15));

        if (request()->wantsJson()) {
            return $dataClass::collect($pagination);
        }

        $initialData = $dataClass::collect($pagination);

        $tableSchema = $resource->table(Table::make('resource_table'))->toArray();

        return UIPage::make($resource->title())
            ->type('list')
            ->schema($tableSchema)
            ->data($initialData)
            ->options([
                'endpoint' => route($resource->routeBaseName() . '.index'), 
                'resourceKey' => $resource->routeBaseName(), 
                'filters' => $resource->filters(), 
            ])
            ->render();
    }
}