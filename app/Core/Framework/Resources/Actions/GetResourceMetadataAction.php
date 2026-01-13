<?php

namespace App\Core\Framework\Resources\Actions;

use Illuminate\Http\Request;
use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\View\Infolist;
use App\Core\Framework\Resources\BaseResource;

class GetResourceMetadataAction extends BaseAction
{
    public function handle(Request $request)
    {
        // 1. Récupération et validation des paramètres
        $resourceClass = $request->get('class');
        $type = $request->get('type'); // 'form' ou 'view'
        $id = $request->get('id');

        if (!class_exists($resourceClass)) {
            return response()->json(['error' => "La ressource {$resourceClass} est introuvable."], 404);
        }

        // 2. Instanciation de la ressource
        /** @var BaseResource $resource */
        $resource = new $resourceClass();
        
        // 3. Récupération du modèle (existant ou nouveau)
        $model = $id ? $resource->findOrNew($id) : null;

        // 4. Construction du schéma selon le besoin
        $schema = ($type === 'form') 
            ? $resource->fields() 
            : $resource->infolist(new Infolist('view'))->toArray();

        // 5. Préparation de la réponse JSON
        return response()->json([
            'schema' => $schema,
            'data' => $model ? ($resource->dataClass())::from($model) : null,
            'options' => [
                'title' => ($id ? "Modifier " : "Ajouter ") . class_basename($resource->model()),
                'submitUrl' => $resource->getSubmitUrl($id),
                'method' => $id ? 'PUT' : 'POST'
            ]
        ]);
    }
}