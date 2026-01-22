<?php

use App\Core\Support\Facades\Intent;
use Illuminate\Support\Facades\Route;
use App\Core\Domains\Admin\Actions\GetCommandsAction;
use App\Core\Domains\Admin\Actions\GetBootstrapDataAction;
use App\Core\Domains\Admin\Actions\Updater\ShowUpdaterAction;
use App\Core\Domains\Admin\Actions\Updater\InstallUpdateAction;
use App\Core\Domains\Admin\Actions\Updater\CheckForUpdateAction;
use App\Core\Domains\Admin\Actions\Updater\DownloadUpdateAction;
use App\Core\Domains\Admin\Actions\Settings\ShowSettingsAppAction;
use App\Core\Domains\Admin\Actions\Updater\UploadUpdateFileAction;
use App\Core\Domains\Admin\Actions\Settings\UpdateSettingsAppAction;

Route::middleware(['web','auth'])->group(function(){

    Route::get('/bootstrap', GetBootstrapDataAction::class)->name('bootstrap');

    /**
    * Paramètres Généraux
    */
    Route::prefix('settings')->as('settings.')->group(function () {
        Route::get('/', ShowSettingsAppAction::class)->name('index');
        Route::put('/', UpdateSettingsAppAction::class)->name('update');
    });

    Route::get('commands', GetCommandsAction::class)->name('commands.index');
    Route::post('intents/execute', function(Request $request) {
                    
            $intentName = $request->input('intent');

            $result = Intent::execute($intentName);
            return response()->json($result);
        });

    Route::prefix('system/update')->name('system.update')->group(function() {

        Route::get('/show', ShowUpdaterAction::class)->name('show');
        Route::get('/check', CheckForUpdateAction::class)->name('.check');
        Route::post('/download', DownloadUpdateAction::class)->name('.download');
        Route::post('/upload', UploadUpdateFileAction::class)->name('.upload');
        Route::post('/install', InstallUpdateAction::class)->name('.install');
    });
});

