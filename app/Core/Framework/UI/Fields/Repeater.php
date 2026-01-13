<?php

namespace App\Core\Framework\UI\Fields;

use App\Core\Framework\Contracts\Field;

class Repeater extends Field
{   
    protected string $type = 'repeater';

    /**
     * Définit le schéma des champs à répéter.
     */
    public function schema(array $components): self
    {
        $this->meta['schema'] = $components;
        return $this;
    }

    public function addLabel(string $label): self
    {
        $this->meta['addLabel'] = $label;
        return $this;
    }
}