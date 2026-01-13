<?php
namespace App\Core\Framework\UI\Widgets;

use App\Core\Framework\Contracts\Component;


class MapWidget extends Component
{
    protected string $type = 'map_card';

    public function title(string $title): self { $this->meta['title'] = $title; return $this; }
    
    public function center(float $lat, float $lng): self {
        $this->meta['center'] = ['lat' => $lat, 'lng' => $lng];
        return $this;
    }

    public function zoom(int $level): self {
        $this->meta['zoom'] = $level;
        return $this;
    }
    public function mapId(string $id): self {
        $this->meta['mapId'] = $id;
        return $this;
    }
    public function markers(array $markers): self {
        $this->meta['markers'] = $markers; // Ex: [['lat' => 48.8, 'lng' => 2.3, 'label' => 'Paris']]
        return $this;
    }
}