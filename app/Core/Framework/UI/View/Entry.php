<?php

namespace App\Core\Framework\UI\View;

use Illuminate\Contracts\Support\Arrayable;

class Entry implements Arrayable
{
    protected array $meta = [];

    public function __construct(protected string $key, protected string $label) {}

    /**
     * @param string $key
     * @param string $label
     * @return Entry
     */
    public static function make(string $key, string $label): static { return new static($key, $label); }

    /**
     * @param array $map
     * @return Entry
     */
    public function asBadge(array $map = []): self { $this->meta['type'] = 'badge'; $this->meta['colorMap'] = $map; return $this; }
    /** Rendu Image */
    public function asImage(): self { $this->meta['type'] = 'image'; return $this; }
    /** Rendu Date */
    public function asDate(string $format = 'd/m/Y'): self { $this->meta['type'] = 'date'; $this->meta['format'] = $format; return $this; }
    /** Rendu Monétaire */
    public function asCurrency(string $currency = '$', string $locale = 'en_US'): self {
        $this->meta['type'] = 'currency';
        $this->meta['currency'] = $currency;
        $this->meta['locale'] = $locale;
        return $this;
    }

    /** Rendu Booléen avec icônes et couleurs */
    public function asBoolean(): self {
        $this->meta['type'] = 'boolean';
        return $this;
    }

    /** Rendu d'un lien cliquable */
    public function asLink(?string $url = null, bool $external = false): self {
        $this->meta['type'] = 'link';
        $this->meta['url'] = $url; // Si nul, utilise la valeur du champ comme URL
        $this->meta['external'] = $external;
        return $this;
    }

    /** Rendu Profil (Avatar + Nom/Email) */
    public function asUser(string $avatarKey = 'avatar_url', ?string $subLabelKey = 'email'): self {
        $this->meta['type'] = 'user';
        $this->meta['avatarKey'] = $avatarKey;
        $this->meta['subLabelKey'] = $subLabelKey;
        return $this;
    }

    /** Ajoute un bouton "Copier" à côté de la valeur */
    public function copyable(): self {
        $this->meta['copyable'] = true;
        return $this;
    }

    // Pour prendre plus de place dans une grille
    public function columnSpan(int $span): self { $this->meta['span'] = $span; return $this; }

    public function toArray(): array
    {
        return array_merge(['key' => $this->key, 'label' => $this->label], $this->meta);
    }
}