<?php

namespace App\Core\Framework\Contracts;

use App\Core\Framework\Contracts\Component;

abstract class Field extends Component
{
    public function component(string $name): self
    {
        $this->meta['component'] = $name;
        
        return $this;
    }

    public function default(mixed $value): self 
    { 
        $this->meta['default'] = $value; 
        return $this; 
    }
    
    public function label(string $label): self
    {
        $this->meta['label'] = $label;
        return $this;
    }

    public function placeholder(string $placeholder): self
    {
        $this->meta['placeholder'] = $placeholder;
        return $this;
    }

    public function help(string $content): self
    {
        $this->meta['help'] = $content;
        return $this;
    }

    public function required(bool $condition = true): self
    {
        $this->meta['required'] = $condition;
        return $this;
    }

    public function validation(array $rules): self
    {
        $this->meta['rules'] = $rules;
        return $this;
    }
}