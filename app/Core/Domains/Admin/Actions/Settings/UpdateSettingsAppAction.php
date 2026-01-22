<?php

namespace App\Core\Domains\Admin\Actions\Settings;

use App\Core\Actions\BaseAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Core\Domains\Admin\Models\Setting;
use App\Core\Domains\Admin\Data\SettingsAppData;

class UpdateSettingsAppAction extends BaseAction
{
    public function handle(SettingsAppData $data): JsonResponse
    {
        DB::transaction(function () use ($data) {
            foreach ($data->toArray() as $key => $value) {
                Setting::set($key, $value,'app');
            }
        });

        return response()->json([
            'message' => 'Configuration mise à jour avec succès.',
            'refresh' => true 
        ]);
    }
}