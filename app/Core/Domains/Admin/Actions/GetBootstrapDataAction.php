<?php

namespace App\Core\Domains\Admin\Actions;

use App\Core\Support\Facades\Menu;
use Illuminate\Support\Facades\Route;
use App\Core\Domains\Users\Data\UserData;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Core\Domains\Admin\Models\Setting;

class GetBootstrapDataAction
{
    use AsAction;

    public function handle()
    {
        return [
            'user' => UserData::fromModel(auth()->user()),
            'settings' => public_settings(),
            'menu' => Menu::get(),
            'currentRoute' => Route::currentRouteName(),
        ];
    }

    public function asController()
    {
        return response()->json($this->handle());
    }
}