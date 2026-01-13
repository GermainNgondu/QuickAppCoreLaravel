<?php

namespace App\Core\Framework\UI\Fields;

use App\Core\Framework\UI\BaseComponent;

class Select extends BaseComponent
{
    protected array $options = [];

    public function options(array $options): self
    {
        $this->options = $options;
        return $this;
    }

    public function toArray(): array
    {
        return [
            'component' => 'Select',
            'name'      => $this->name,
            'label'     => $this->label,
            'options'   => $this->options,
            'rules'     => $this->rules,
            'required'  => $this->required,
            'placeholder' => $this->placeholder,
            'default'     => $this->defaultValue,
        ];
    }
}