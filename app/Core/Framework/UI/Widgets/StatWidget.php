<?php
namespace App\Core\Framework\UI\Widgets;

use App\Core\Framework\Contracts\Component;


class StatWidget extends Component {
    protected string $type = 'stat_card';

    public function value($value): self { $this->meta['value'] = $value; return $this; }
    public function label(string $label): self { $this->meta['label'] = $label; return $this; }
    public function icon(string $icon): self { $this->meta['icon'] = $icon; return $this; }
    public function trend(float $percentage): self { $this->meta['trend'] = $percentage; return $this; }
}