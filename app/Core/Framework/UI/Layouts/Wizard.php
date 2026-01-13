<?php

namespace App\Core\Framework\UI\Layouts;

use App\Core\Framework\Contracts\Component;

class Wizard extends Component
{
    protected string $type = 'wizard';

    public function steps(array $steps): self
    {
        $this->meta['steps'] = $steps;
        return $this;
    }
}