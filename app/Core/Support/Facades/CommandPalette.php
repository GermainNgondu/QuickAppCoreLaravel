<?php

namespace App\Core\Support\Facades;

use Illuminate\Support\Facades\Facade;
use App\Core\Framework\Managers\CommandManager;

class CommandPalette extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return CommandManager::class;
    }
}