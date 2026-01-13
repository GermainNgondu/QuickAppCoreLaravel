<?php

namespace App\Core\Framework\UI\Fields;

use App\Core\Framework\Contracts\Field;

class RadioGroup extends Field {
    protected string $type = 'radio_group';
    public function options(array $options): self { $this->meta['options'] = $options; return $this; }
}