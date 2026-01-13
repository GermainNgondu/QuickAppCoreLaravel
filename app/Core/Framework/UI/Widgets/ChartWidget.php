<?php
namespace App\Core\Framework\UI\Widgets;

use App\Core\Framework\Contracts\Component;

class ChartWidget extends Component {
    protected string $type = 'chart_card';

    public function title(string $title): self { $this->meta['title'] = $title; return $this; }
    public function data(array $data): self { $this->meta['data'] = $data; return $this; }
    public function chartType(string $type = 'area'): self { $this->meta['chartType'] = $type; return $this; }
}