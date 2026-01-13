<?php

use Illuminate\Support\Facades\Route;
use App\Core\Framework\Managers\TranslationManager;


Route::get('/lang/{locale}', function ($locale) {

    $check =  collect(TranslationManager::getAvailableLocales())->where('code',$locale)->first();

    if (!$check) {
        abort(404);
    }
    
    app()->setLocale($locale);
    
    return response()->json(json_decode(TranslationManager::getJsonTranslations(), true));
});