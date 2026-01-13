<?php

use Illuminate\Support\Facades\Route;
use App\Core\Domains\Media\Models\Media;
use App\Core\Domains\Media\Actions\ShowMediaAction;
use App\Core\Domains\Media\Actions\DeleteMediaAction;
use App\Core\Domains\Media\Actions\SearchMediaAction;
use App\Core\Domains\Media\Actions\UpdateMediaAction;
use App\Core\Domains\Media\Actions\UploadMediaAction;
use App\Core\Domains\Media\Actions\RestoreMediaAction;
use App\Core\Domains\Media\Actions\BulkDeleteMediaAction;
use App\Core\Domains\Media\Actions\GenerateAiMediaAction;
use App\Core\Domains\Media\Actions\ListMediaLibraryAction;
use App\Core\Domains\Media\Actions\ImportMediaFromUrlAction;
use App\Core\Domains\Media\Actions\MoveMediaCollectionAction;

Route::middleware(['web', 'auth'])->prefix('admin/media')->as('admin.media.')->group(function () {

    // Route principale pour le MediaPicker et le Gestionnaire
    Route::get('/', ListMediaLibraryAction::class)->name('index');

    Route::get('/{media}', ShowMediaAction::class)->name('show');

    // Ingestion
    Route::post('/upload', UploadMediaAction::class)->name('upload');
    Route::post('/import', ImportMediaFromUrlAction::class)->name('import');

    // Drivers externes
    Route::get('/search', SearchMediaAction::class)->name('search');
    Route::post('/ai-generate', GenerateAiMediaAction::class)->name('ai.generate');

    // Déplacement de médias entre collections (bulk)
    Route::post('/move', MoveMediaCollectionAction::class)->name('move');

    Route::put('/', UpdateMediaAction::class)->name('update');
    Route::delete('/', DeleteMediaAction::class)->name('delete');

    Route::delete('/bulk-delete', BulkDeleteMediaAction::class)->name('bulk-delete');
    
    // Restauration de médias depuis la corbeille
    Route::post('/restore', RestoreMediaAction::class)->name('restore');

    Route::delete('/force-delete', function (Request $request) {
        // Logique rapide ou appel à une action dédiée
        Media::onlyTrashed()
            ->whereIn('id', $request->ids)
            ->forceDelete();
        return response()->json(['message' => 'Suppression définitive réussie']);
    })->name('force-delete');

});