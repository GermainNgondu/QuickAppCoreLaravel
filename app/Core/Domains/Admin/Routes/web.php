<?php

use Illuminate\Support\Facades\Route;
use App\Core\Domains\Admin\Actions\ShowDashboardAction;

Route::middleware(['web', 'auth'])->prefix('admin')->as('admin.')->group(function () {
    /**
     * Dashboard Principal
     */
    Route::get('/dashboard', ShowDashboardAction::class)->name('dashboard');

});