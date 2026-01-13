<?php
namespace App\Core\Framework\UI\Table;

use Illuminate\Support\Facades\Gate;
use Illuminate\Contracts\Support\Arrayable;

class Column implements Arrayable
{
    protected bool $isAuthorized = true;

    protected array $meta = ['visible' => true]; // Visible par défaut

    public function __construct(protected string $key, protected string $label)
    {
    }

    public static function make(string $key, string $label): static
    {
        return new static($key, $label);
    }

    public function sortable(bool $sortable = true): self
    {
        $this->meta['sortable'] = $sortable;
        return $this;
    }

    public function hidden(): self
    {
        $this->meta['visible'] = false;
        return $this;
    }
    // Rendu Image (Avatar)
    public function asImage(bool $rounded = true): self
    {
        $this->meta['type'] = 'image';
        $this->meta['rounded'] = $rounded;
        return $this;
    }

    // Rendu Badge / Tags
    public function asBadge(array $map = []): self
    {
        $this->meta['type'] = 'badge';
        $this->meta['colorMap'] = $map;
        return $this;
    }

    // Rendu Booléen (Icone Check/X)
    public function asBoolean(): self
    {
        $this->meta['type'] = 'boolean';
        return $this;
    }

    // Rendu Barre de progression
    public function asProgress(): self
    {
        $this->meta['type'] = 'progress';
        return $this;
    }

    // Rendu Date
    public function asDate(string $format = 'd/m/Y'): self
    {
        $this->meta['type'] = 'date';
        $this->meta['format'] = $format;
        return $this;
    }

    /**
     * Vérifie si l'utilisateur peut voir ce composant
     */
    public function can(string $permission, $model = null): self
    {
        $this->isAuthorized = Gate::allows($permission, $model);
        return $this;
    }

    /**
     * Condition personnalisée simple
     */
    public function visibleIf(bool $condition): self
    {
        $this->isAuthorized = $condition;
        return $this;
    }
    public function toArray(): array
    {
        if (!$this->isAuthorized) {
            return ['type' => 'hidden', 'key' => $this->key];
        }
        return array_merge(['key' => $this->key, 'label' => $this->label], $this->meta);
    }
}