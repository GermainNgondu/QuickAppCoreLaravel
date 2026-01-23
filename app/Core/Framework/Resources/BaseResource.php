<?php

namespace App\Core\Framework\Resources;

use Spatie\QueryBuilder\QueryBuilder;
use App\Core\Framework\UI\Table\Table;
use Illuminate\Database\Eloquent\Model;
use App\Core\Framework\UI\View\Infolist;

abstract class BaseResource
{
    /**
     * Retourne la classe du modèle Eloquent (ex: User::class)
     */
    abstract public function model(): string;

    /**
     * Retourne la classe Spatie Laravel Data (ex: UserData::class)
     */
    abstract public function dataClass(): string;

    /**
     * Retourne le titre de la ressource
     */
    abstract public function title(): string;
    
    /** Définit le nom de base des routes */
    abstract public function routeBaseName(): string;

    /**
     * Définition des filtres autorisés pour Spatie Query Builder
     */
    abstract public function filters(): array;

    /**
     * Définition des tris autorisés pour Spatie Query Builder
     */
    abstract public function sorts(): array;

    /**
     * Configuration de la table (Liste)
     */
    abstract public function table(Table $table): Table;

    /**
     * Configuration des champs du formulaire (Create/Edit)
     */
    abstract public function fields(): array;

    public function actions(): array { return []; }

    abstract public function permissionPrefix(): string;

    /**
     * Configuration de la vue détail (Optionnel)
     */
    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist;
    }

    /**
     * Initialise la requête avec Spatie Query Builder
     */
    public function getQuery(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
            ->allowedFilters($this->filters())
            ->allowedSorts($this->sorts())
            ->defaultSort('created_at');
    }

    /**
     * Récupère une instance du modèle ou une nouvelle instance
     */
    public function findOrNew($id = null): Model
    {
        $modelClass = $this->model();
        return $id ? $modelClass::findOrFail($id) : new $modelClass;
    }

    public function getSubmitUrl($id = null): string
    {
        $routeName = $id ? "{$this->routeBaseName()}.update" : "{$this->routeBaseName()}.store";
        return route($routeName, $id ? ['id' => $id] : []);
    }
}