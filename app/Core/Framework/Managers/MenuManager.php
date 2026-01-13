<?php

namespace App\Core\Framework\Managers;

use App\Core\Framework\Data\MenuItemData;

class MenuManager
{
    public function __construct(
        protected FeatureManager $features,
        protected HookManager $hooks
    ) {}
    protected static array $registry = [];

    /**
     * Enregistre un item manuellement (via ServiceProvider).
     */
    public static function register(array $item): void
    {
        static::$registry[] = array_merge([
            'id'         => null,
            'feature'    => null, // Si défini, l'item dépend de l'activation d'un module
            'title'      => 'Sans titre',
            'icon'       => 'layout-dashboard',
            'route'      => null,
            'order'      => 99,
            'permission' => null,
            'children'   => []
        ], $item);
    }

    /**
     * Génère et filtre la navigation finale.
     */
    public function get(): array
    {
        // 1. On part de la liste enregistrée dans le registre
        $menu = collect(static::$registry);

        // 2. On filtre les items basés sur les Features (modules) activés
        $menu = $menu->filter(function ($item) {
            // Si l'item est lié à une feature, on vérifie si elle est active
            if ($item['feature'] && !$this->features->isEnabled($item['feature'])) {
                return false;
            }
            
            // Filtre de permission classique
            if ($item['permission'] && !auth()->user()?->can($item['permission'])) {
                return false;
            }

            return true;
        });

        // 3. Transformation pour le format Frontend
        $formattedMenu = $menu->map(function ($item) {
            return MenuItemData::fromRegistry($item);
        })->sortBy('order')->groupBy('group')->toArray();

        // 4. Application du Hook (Filter) pour permettre des modifications de dernière minute
        // C'est ici que d'autres domaines peuvent injecter des liens externes ou réorganiser
        return $this->hooks->applyFilters('navigation.main', $formattedMenu);
    }
}