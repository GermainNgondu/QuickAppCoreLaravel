<?php

namespace App\Core\Framework\UI\Fields;

use App\Core\Framework\Contracts\Field;
class Slider extends Field {
    protected string $type = 'slider';
    public function min(int $min): self { $this->meta['min'] = $min; return $this; }
    public function max(int $max): self { $this->meta['max'] = $max; return $this; }
    public function step(int $step): self { $this->meta['step'] = $step; return $this; }
}