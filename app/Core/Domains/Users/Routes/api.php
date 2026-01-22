<?php

use Illuminate\Support\Facades\Route;
use App\Core\Domains\Users\Actions\ListUsersAction;
use App\Core\Domains\Users\Actions\CreateUserAction;
use App\Core\Domains\Users\Actions\DeleteUserAction;
use App\Core\Domains\Users\Actions\UpdateUserAction;

Route::middleware(['web','auth'])->as('users.')->group(function () {
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