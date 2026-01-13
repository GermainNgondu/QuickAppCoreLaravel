<?php

namespace App\Core\Framework\UI\Layouts;

use App\Core\Framework\Contracts\Component;

class Step extends Component
{
    protected string $type = 'wizard_step';

    public function title(string $title): self
    {
        $this->meta['title'] = $title;
        return $this;
    }
}