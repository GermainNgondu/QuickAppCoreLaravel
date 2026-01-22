<?php

use Illuminate\Support\Facades\Route;
use App\Core\Domains\Users\Actions\LoginUserAction;
use App\Core\Domains\Users\Actions\LogoutUserAction;
/*
|--------------------------------------------------------------------------
| Routes du Domaine Users
|--------------------------------------------------------------------------
*/

/**
 * Routes Publiques (Accessibles aux invités seulement)
 */
Route::middleware(['web', 'guest'])->prefix('admin')->group(function () {
    // Une seule route pour le GET (formulaire) et le POST (traitement)
    Route::match(['get', 'post'], 'login', LoginUserAction::class)->name('login');
});

/**
 * Routes Administratives (Accessibles après authentification)
 */
Route::middleware(['web', 'auth'])->prefix('admin')->as('admin.')->group(function () {

    // Déconnexion
    Route::post('logout', LogoutUserAction::class)->name('logout');

});