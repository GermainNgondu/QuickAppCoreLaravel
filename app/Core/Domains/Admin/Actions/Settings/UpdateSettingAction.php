<?php

namespace App\Core\Domains\Admin\Actions;

use App\Core\Actions\BaseAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Core\Domains\Admin\Models\Setting;
use App\Core\Domains\Admin\Data\SettingData;

class UpdateSettingAction extends BaseAction
{
    public function handle(SettingData $data): JsonResponse
    {
        // On utilise une transaction pour être sûr que tout est sauvegardé
        DB::transaction(function () use ($data) {
            Setting::set($data->key, $data->value, $data->type,$data->group,$data->description, $data->is_locked);
        });

        return response()->json([
            'message' => 'Configuration mise à jour avec succès.',
            'refresh' => true 
        ]);
    }
}