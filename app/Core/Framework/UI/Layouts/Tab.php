<?php

namespace App\Core\Framework\UI\Layouts;

use App\Core\Framework\Contracts\Component;

class Tab extends Component
{
    protected string $type = 'tab_item';

    public function label(string $label): self
    {
        $this->meta['label'] = $label;
        return $this;
    }

    public function icon(string $icon): self
    {
        $this->meta['icon'] = $icon;
        return $this;
    }
}