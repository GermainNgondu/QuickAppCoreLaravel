<?php

namespace App\Core\Framework\Resources\Actions;

use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;
use App\Core\Framework\Resources\BaseResource;


class FormResourceAction extends BaseAction
{
    /**
     * @param BaseResource $resource L'instance de la ressource
     * @param mixed $id L'ID optionnel pour le mode édition
     */
    public function handle(BaseResource $resource, $id = null)
    {
        $dataClass = $resource->dataClass();

        $model = $id ? $resource->findOrNew($id) : null;
            
        return UIPage::make($id ? "Modifier l'enregistrement" : "Nouvel enregistrement")
            ->type('form')
            ->schema($resource->fields()) // Récupère les champs PHP
            ->data($model ? $dataClass::from($model) : null)
            ->options([
                'submitUrl' => $resource->getSubmitUrl($id),
                'method' => $id ? 'PUT' : 'POST'
            ])
            ->render();
    }
}