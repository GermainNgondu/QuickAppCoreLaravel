<?php

namespace App\Core\Framework\UI\Fields;

use App\Core\Framework\Contracts\Field;

class TextInput extends Field 
{
    protected string $type = 'text_input';
    public function type(string $type): self { $this->meta['inputType'] = $type; return $this; }
}