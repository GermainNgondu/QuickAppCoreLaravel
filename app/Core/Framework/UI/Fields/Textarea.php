<?php

namespace App\Core\Framework\UI\Fields;

use App\Core\Framework\Contracts\Field;

class Textarea extends Field
{
    protected string $type = 'textarea';
    
    public function rows(int $rows = 3): self 
    { 
        $this->meta['rows'] = $rows; 
        return $this; 
    }
}