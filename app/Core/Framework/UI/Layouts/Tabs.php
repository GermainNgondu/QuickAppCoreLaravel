<?php

namespace App\Core\Framework\UI\Layouts;

use App\Core\Framework\Contracts\Component;

class Tabs extends Component
{
    protected string $type = 'tabs';

    public function tabs(array $tabs): self
    {
        $this->meta['tabs'] = $tabs;
        return $this;
    }
}