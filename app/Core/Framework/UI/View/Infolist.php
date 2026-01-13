<?php

namespace App\Core\Framework\UI\View;

use App\Core\Framework\Contracts\Component;

class Infolist extends Component
{
    protected string $type = 'info_list';

    public function schema(array $schema): self { $this->meta['schema'] = $schema; return $this; }
    
    // Pour organiser en colonnes (ex: Grid)
    public function columns(int $count): self { $this->meta['columns'] = $count; return $this; }
}