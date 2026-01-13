<?php

namespace App\Core\Domains\Users\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class UserServiceProvider extends ServiceProvider 
{
    public function boot() 
    {
        Route::middleware('web')->group(__DIR__ . '/../Routes/web.php');
        $this->loadMigrationsFrom(__DIR__ . '/../Migrations');
    }
}