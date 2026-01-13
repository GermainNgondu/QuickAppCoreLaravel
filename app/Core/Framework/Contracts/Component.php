<?php

namespace App\Core\Framework\Contracts;

use Illuminate\Contracts\Support\Arrayable;

abstract class Component implements Arrayable
{
    protected string $type;
    protected array $meta = [];

    public function __construct(protected string $key) {}

    public static function make(string $key): static
    {
        return new static($key);
    }
    /**
     * Permet de définir une valeur arbitraire dans le tableau meta
     */
    public function set(string $key, mixed $value): self
    {
        $this->meta[$key] = $value;
        return $this;
    }

    /**
     * Helper spécifique pour les classes CSS
     */
    public function className(string $classes): self
    {
        return $this->set('className', $classes);
    }

    public function schema(array $components): self
    {
        $this->meta['schema'] = $components;
        return $this;
    }

    public function toArray(): array {
        return array_merge([
            'type' => $this->type,
            'key'  => $this->key,
            'name' => $this->key,
        ], $this->meta);
    }
}