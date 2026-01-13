<?php

namespace App\Core\Domains\Media;

use App\Core\Domains\Media\Drivers\UnsplashDriver;
use App\Core\Domains\Media\Drivers\AiDriver;
use InvalidArgumentException;

class MediaManager
{
    protected array $drivers = [];

    public function __construct()
    {
        $this->drivers = [
            'unsplash' => new UnsplashDriver(),
            'ai'       => new AiDriver(),
        ];
    }

    public function driver(string $name)
    {
        if (!isset($this->drivers[$name])) {
            throw new InvalidArgumentException("Driver Media [{$name}] non supporté.");
        }
        return $this->drivers[$name];
    }
}