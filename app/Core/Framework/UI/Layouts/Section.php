<?php

namespace App\Core\Framework\UI\Layouts;

use App\Core\Framework\Contracts\Component;

class Section extends Component
{
    protected string $type = 'section';

    public function title(string $title): self
    {
        $this->meta['title'] = $title;
        return $this;
    }

    public function description(string $description): self
    {
        $this->meta['description'] = $description;
        return $this;
    }

    public function aside(): self
    {
        $this->meta['aside'] = true;
        return $this;
    }
}