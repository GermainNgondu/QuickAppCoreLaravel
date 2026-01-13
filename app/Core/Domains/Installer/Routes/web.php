<?php

use Illuminate\Support\Facades\Route;
use App\Core\Domains\Installer\Actions\InstallerMasterAction;


Route::match(['get', 'post'], 'install', InstallerMasterAction::class)->name('installer.master');