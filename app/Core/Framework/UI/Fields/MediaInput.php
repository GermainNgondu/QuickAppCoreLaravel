<?php

namespace App\Core\Framework\UI\Fields;

use App\Core\Framework\Contracts\Field;

class MediaInput extends Field
{
    protected string $type = 'media_input';
    
    protected array $acceptedTypes = [
        'image/*',
        'video/*',
        'audio/*',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/zip',
        'application/csv',
    ];
    protected string $collection = 'default';

    public function accepts(array $types): self
    {
        $this->meta['acceptedTypes'] = $types;
        return $this;
    }
    
    public function multiple(bool $condition = true): self
    {
        $this->meta['multiple'] = $condition;
        return $this;
    }
    
    public function collection(string $collection): self 
    { 
        $this->meta['collection'] = $collection; 
        return $this; 
    }
}