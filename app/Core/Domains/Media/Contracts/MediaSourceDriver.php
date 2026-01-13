<?php

namespace App\Core\Domains\Media\Contracts;

interface MediaSourceDriver
{
    /**
     * Recherche des médias sur la plateforme externe.
     */
    public function search(string $query, int $page = 1, int $perPage = 20): array;

    /**
     * Récupère les détails d'un média spécifique.
     */
    public function find(string $id): array;

    /**
     * Retourne le nom unique du driver (unsplash, ai, etc.)
     */
    public function getName(): string;
}