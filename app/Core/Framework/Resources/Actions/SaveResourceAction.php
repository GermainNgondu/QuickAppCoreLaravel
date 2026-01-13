<?php

namespace App\Core\Framework\Resources\Actions;

use Illuminate\Http\Request;
use App\Core\Actions\BaseAction;
use App\Core\Support\Traits\HasApiResponse;
use App\Core\Framework\Resources\BaseResource;

class SaveResourceAction extends BaseAction
{
    use HasApiResponse;

    public function handle(BaseResource $resource, Request $request, $id = null)
    {
        $model = $resource->findOrNew($id);
        $dataClass = $resource->dataClass();

        // 1. Validation automatique via Spatie Data
        $validatedData = $dataClass::validate($request->all());

        // 2. Remplissage et sauvegarde
        $model->fill($validatedData); 
        $model->save();

        // 3. Réponse standardisée pour Sonner (toast) côté React
        return $this->successResponse($id ? __('Mis à jour avec succès') : __('Créé avec succès'), [
            'data' => $dataClass::from($model),
            'redirect' => route(strtolower(class_basename($resource->model())) . '.index')
        ]);
    }
}