<?php

namespace App\Core\Framework\UI\Layouts;

use App\Core\Framework\Contracts\Component;

class Grid extends Component
{
    protected string $type = 'grid';

    public function columns(int|array $columns = 2): self
    {
        // On peut passer un entier ou un tableau [default, md, lg]
        $this->meta['columns'] = $columns;
        return $this;
    }

    public function gap(int $gap = 4): self
    {
        $this->meta['gap'] = $gap;
        return $this;
    }
}