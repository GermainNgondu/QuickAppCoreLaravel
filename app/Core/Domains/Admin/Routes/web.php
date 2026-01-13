<?php

use App\Core\Support\Facades\Intent;
use Illuminate\Support\Facades\Route;
use App\Core\Domains\Admin\Actions\GetCommandsAction;
use App\Core\Domains\Admin\Actions\ShowDashboardAction;
use App\Core\Domains\Admin\Actions\Settings\UpdateSettingsAppAction;
use App\Core\Domains\Admin\Actions\GetBootstrapDataAction;
use App\Core\Domains\Admin\Actions\Updater\ShowUpdaterAction;

Route::middleware(['web', 'auth'])->prefix('admin')->as('admin.')->group(function () {
    
    /**
     * Route Bootstrap : Chargée par TanStack Query dans AdminLayout
     * Fournit : User, Menu, Settings, CurrentRoute
     */
    Route::get('/bootstrap', GetBootstrapDataAction::class)->name('bootstrap');

    /**
     * Dashboard Principal
     */
    Route::get('/dashboard', ShowDashboardAction::class)->name('dashboard');

    /**
     * Paramètres Généraux
     */
    Route::prefix('settings')->as('settings.')->group(function () {
        Route::get('/', UpdateSettingsAppAction::class)->name('index');
        Route::put('/', UpdateSettingsAppAction::class)->name('update');
    });

    Route::get('commands', GetCommandsAction::class)->name('commands.index');
    Route::get('system/update', ShowUpdaterAction::class)->name('system.update');
    Route::post('intents/execute', function(Request $request) {
                
        $intentName = $request->input('intent');

        $result = Intent::execute($intentName);
        return response()->json($result);
    });

});