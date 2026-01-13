<?php

namespace App\Core\Actions;

use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;


abstract class BaseAction
{
    use AsAction;

    /**
     * Exécute l'action dans une transaction sécurisée.
     */
    public static function runTransactional(...$arguments)
    {
        return DB::transaction(fn() => static::run(...$arguments));
    }
}