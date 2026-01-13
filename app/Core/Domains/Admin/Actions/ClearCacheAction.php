<?php
namespace App\Core\Domains\Admin\Actions;

use Illuminate\Support\Facades\Artisan;
use Lorisleiva\Actions\Concerns\AsAction;

class ClearCacheAction {
    use AsAction;

    public function handle() {
        Artisan::call('cache:clear');
        return ['message' => __('Le cache a été vidé avec succès !')];
    }
}