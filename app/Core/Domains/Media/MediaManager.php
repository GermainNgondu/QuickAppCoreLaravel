<?php

namespace App\Core\Domains\Media;

use App\Core\Domains\Media\Drivers\UnsplashDriver;
use App\Core\Domains\Media\Drivers\AiDriver;
use InvalidArgumentException;
use Closure;

class MediaManager
{
    /**
     * Le tableau des instances de drivers résolues.
     */
    protected array $drivers = [];

    /**
     * Les callbacks pour créer des drivers personnalisés (extensions).
     */
    protected array $customCreators = [];

    /**
     * Récupère une instance de driver par son nom.
     *
     * @param string $name
     * @return mixed
     * @throws InvalidArgumentException
     */
    public function driver(string $name)
    {
        if (isset($this->drivers[$name])) {
            return $this->drivers[$name];
        }

        return $this->drivers[$name] = $this->resolve($name);
    }

    /**
     * Enregistre un driver personnalisé (Extension).
     * * @param string $name Le nom du driver (ex: 'dropbox')
     * @param Closure $callback La fonction qui retourne l'instance du driver
     * @return $this
     */
    public function extend(string $name, Closure $callback): self
    {
        $this->customCreators[$name] = $callback;
        
        return $this;
    }

    /**
     * Résout le driver demandé.
     */
    protected function resolve(string $name)
    {

        if (isset($this->customCreators[$name])) {
            return call_user_func($this->customCreators[$name]);
        }

        $method = 'create' . ucfirst($name) . 'Driver';

        if (method_exists($this, $method)) {
            return $this->$method();
        }

        throw new InvalidArgumentException("Driver Media [{$name}] non supporté.");
    }

    /**
     * Unsplash Driver
     */
    protected function createUnsplashDriver(): UnsplashDriver
    {
        return new UnsplashDriver();
    }

    /**
     * AI Driver
     */
    protected function createAiDriver(): AiDriver
    {
        return new AiDriver();
    }
}