<?php

use Illuminate\Support\Facades\Route;
use App\Core\Domains\Users\Actions\LoginUserAction;
use App\Core\Domains\Users\Actions\LogoutUserAction;
use App\Core\Domains\Users\Actions\ListUsersAction;
use App\Core\Domains\Users\Actions\CreateUserAction;
use App\Core\Domains\Users\Actions\UpdateUserAction;
use App\Core\Domains\Users\Actions\DeleteUserAction;

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

    // Gestion des utilisateurs (CRUD)
    Route::prefix('users')->as('users.')->group(function () {
        
        // Liste des utilisateurs (Supporte HTML et JSON pour DataTable)
        Route::get('/', ListUsersAction::class)->name('index');

        // Création (GET pour afficher UserForm, POST pour enregistrer)
        Route::get('/create', CreateUserAction::class)->name('create');
        Route::post('/', CreateUserAction::class)->name('store');

        // Modification (GET pour afficher UserForm, PUT pour mettre à jour)
        Route::get('/{user}/edit', UpdateUserAction::class)->name('edit');
        Route::put('/{user}', UpdateUserAction::class)->name('update');

        // Suppression
        Route::delete('/{user}', DeleteUserAction::class)->name('delete');
        
    });

});