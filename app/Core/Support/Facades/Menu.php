<?php

namespace App\Core\Support\Facades;

use Illuminate\Support\Facades\Facade;
use App\Core\Framework\Managers\MenuManager;


class Menu extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return MenuManager::class;
    }
}