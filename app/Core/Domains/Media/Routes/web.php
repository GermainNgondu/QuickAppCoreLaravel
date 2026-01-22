<?php

use Illuminate\Support\Facades\Route;
use App\Core\Domains\Media\Actions\ShowMediaLibraryAction;

Route::middleware(['web', 'auth'])->as('admin.media.')->group(function () {

    // Route principale pour le MediaPicker et le Gestionnaire
    Route::get('/admin/media', ShowMediaLibraryAction::class)->name('index');

});