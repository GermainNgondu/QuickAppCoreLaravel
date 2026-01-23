<?php


use Illuminate\Support\Facades\Artisan;
use App\Core\Infrastructure\Console\Commands\CoreManifestCacheCommand;

Artisan::command('core:cache', function () {
    $this->call(CoreManifestCacheCommand::class);
})->purpose('Génère le manifeste de découverte des modules pour QuickAppCore');