<?php

namespace App\Core\Framework\UI\Layouts;

use App\Core\Framework\Contracts\Component;

class Split extends Component
{
    protected string $type = 'split';

    public function panes(array $panes): self
    {
        $this->meta['panes'] = $panes;
        return $this;
    }
}