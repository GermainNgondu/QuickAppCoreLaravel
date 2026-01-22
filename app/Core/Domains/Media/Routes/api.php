<?php

use Illuminate\Support\Facades\Route;
use App\Core\Domains\Media\Models\Media;
use App\Core\Domains\Media\Actions\ShowMediaAction;
use App\Core\Domains\Media\Actions\DeleteMediaAction;
use App\Core\Domains\Media\Actions\SearchMediaAction;
use App\Core\Domains\Media\Actions\UpdateMediaAction;
use App\Core\Domains\Media\Actions\RestoreMediaAction;
use App\Core\Domains\Media\Actions\BulkDeleteMediaAction;
use App\Core\Domains\Media\Actions\ListMediaLibraryAction;
use App\Core\Domains\Media\Actions\Upload\UploadMediaAction;
use App\Core\Domains\Media\Actions\MoveMediaCollectionAction;
use App\Core\Domains\Media\Actions\Upload\GenerateAiMediaAction;
use App\Core\Domains\Media\Actions\Upload\ImportMediaFromUrlAction;
use App\Core\Domains\Media\Actions\Collections\CreateCollectionAction;
use App\Core\Domains\Media\Actions\Collections\DeleteCollectionAction;
use App\Core\Domains\Media\Actions\Collections\UpdateCollectionAction;
use App\Core\Domains\Media\Actions\Collections\GetMediaCollectionsAction;

Route::middleware(['web','auth'])->as('admin.media.')->group(function () {

    // Route principale pour le MediaPicker et le Gestionnaire
    Route::get('/list', ListMediaLibraryAction::class)->name('list');

    Route::get('/{media}', ShowMediaAction::class)->name('show');

    // Ingestion
    Route::post('/upload', UploadMediaAction::class)->name('upload');
    Route::post('/import', ImportMediaFromUrlAction::class)->name('import');

    // Drivers externes
    Route::get('/search', SearchMediaAction::class)->name('search');
    Route::post('/ai-generate', GenerateAiMediaAction::class)->name('ai.generate');

    // Déplacement de médias entre collections (bulk)
    Route::post('/move', MoveMediaCollectionAction::class)->name('move');

    Route::put('/{media}', UpdateMediaAction::class)->name('update');
    Route::delete('/{media}', DeleteMediaAction::class)->name('delete');

    Route::delete('/bulk-delete', BulkDeleteMediaAction::class)->name('bulk-delete');
    
    //Collection
    Route::get('/collections', GetMediaCollectionsAction::class)->name('collections');
    Route::post('/collections', CreateCollectionAction::class)->name('collections.create');
    Route::put('/collections/{collection}', UpdateCollectionAction::class)->name('collections.update');
    Route::delete('/collections/{collection}', DeleteCollectionAction::class)->name('collections.delete');

    // Restauration de médias depuis la corbeille
    Route::post('/restore', RestoreMediaAction::class)->name('restore');

    Route::delete('/force-delete', function (Request $request) {
        Media::onlyTrashed()
            ->whereIn('id', $request->ids)
            ->forceDelete();
        return response()->json(['message' => 'Suppression définitive réussie']);
    })->name('force-delete');

});
