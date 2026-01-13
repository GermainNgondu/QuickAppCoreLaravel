<?php

namespace App\Core\Support\Facades;

use Illuminate\Support\Facades\Facade;
use App\Core\Framework\Managers\IntentManager;

/**
 * @method static void register(string $name, string|callable $handler)
 * @method static mixed execute(string $name, ...$parameters)
 * @method static bool has(string $name)
 */
class Intent extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return IntentManager::class;
    }
}