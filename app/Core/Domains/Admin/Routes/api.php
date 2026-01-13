<?php

use Illuminate\Support\Facades\Route;
use App\Core\Domains\Admin\Actions\Updater\InstallUpdateAction;
use App\Core\Domains\Admin\Actions\Updater\CheckForUpdateAction;
use App\Core\Domains\Admin\Actions\Updater\DownloadUpdateAction;
use App\Core\Domains\Admin\Actions\Updater\UploadUpdateFileAction;

Route::prefix('system/update')->name('system.update')->group(function() {

        Route::get('/check', CheckForUpdateAction::class)->name('.check');
        Route::post('/download', DownloadUpdateAction::class)->name('.download');
        Route::post('/upload', UploadUpdateFileAction::class)->name('.upload');
        Route::post('/install', InstallUpdateAction::class)->name('.install');
    });