<?php

namespace App\Core\Framework\Resources;

use Illuminate\Support\Collection;
use Exception;

class ResourceRegistry
{
    protected Collection $resources;

    public function __construct()
    {
        $this->resources = collect();
    }

    public function register(string $resourceClass): void
    {
        $resource = app($resourceClass);
        $this->resources->put($resource->getId(), $resource);
    }

    public function get(string $id): BaseResource
    {
        if (!$this->resources->has($id)) {
            throw new Exception("Resource [{$id}] not found in Registry.");
        }
        return $this->resources->get($id);
    }

    public function all(): Collection
    {
        return $this->resources;
    }
}