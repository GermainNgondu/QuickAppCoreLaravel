<?php

namespace App\Core\Framework\Managers;

use Closure;
use Illuminate\Support\Collection;


class HookManager
{
    /**
     * Stockage des hooks enregistrés.
     */
    protected Collection $hooks;

    public function __construct()
    {
        $this->hooks = collect();
    }

    /**
     * Enregistre un callback sur un hook spécifique.
     * * @param string $name Nom du hook (ex: 'menu.sidebar.tools')
     * @param Closure $callback La fonction à exécuter
     * @param int $priority Ordre d'exécution (plus petit = plus tôt)
     */
    public function register(string $name, Closure $callback, int $priority = 10): void
    {
        $this->hooks->push([
            'name'     => $name,
            'callback' => $callback,
            'priority' => $priority,
        ]);
    }

    /**
     * Récupère tous les contenus enregistrés pour un hook et les exécute.
     * Utile pour injecter des éléments UI (boutons, liens).
     */
    public function render(string $name, ...$args): string
    {
        return $this->getHooksFor($name)
            ->map(fn($hook) => app()->call($hook['callback'], $args))
            ->implode('');
    }

    /**
     * Applique un filtre sur une donnée.
     * Utile pour modifier une configuration ou un tableau avant usage.
     */
    public function applyFilters(string $name, $value, ...$args)
    {
        return $this->getHooksFor($name)
            ->reduce(function ($carry, $hook) use ($args) {
                return app()->call($hook['callback'], array_merge([$carry], $args));
            }, $value);
    }

    /**
     * Filtre et trie les hooks par priorité.
     */
    protected function getHooksFor(string $name): Collection
    {
        return $this->hooks
            ->where('name', $name)
            ->sortBy('priority');
    }
}