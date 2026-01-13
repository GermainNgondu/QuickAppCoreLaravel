<?php

namespace App\Core\Framework\UI;

use App\Core\Support\Helpers\ReactRender;
use Illuminate\Contracts\Support\Renderable;

class UIPage implements Renderable
{
    protected array $config = [
        'title' => '',
        'type' => 'page',
        'schema' => [],
        'data' => [],
        'options' => []
    ];

    public static function make(string $title): self 
    {
        $instance = new static();
        $instance->config['title'] = $title;
        return $instance;
    }

    public function type(string $type): self 
    {
        $this->config['type'] = $type; 
        return $this; 
    }
    public function schema(array $schema): self 
    {
        $this->config['schema'] = $schema; 
        return $this; 
    }
    public function data($data): self 
    {
        $this->config['data'] = $data; 
        return $this; 
    }

    public function options(array $options): self
    {
        $this->config['options'] = $options;
        return $this;
    }
    public function render(): mixed
    {
        return view('core::pages.generic', [
            'title' => $this->config['title'],
            'component' => ReactRender::make('Core::GenericPage', $this->config)
        ]);
    }
}