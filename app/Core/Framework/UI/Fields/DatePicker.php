<?php

namespace App\Core\Framework\UI\Fields;

use App\Core\Framework\Contracts\Field;

class DatePicker extends Field
{
    protected string $type = 'date_picker';
    protected string $format = 'PPP'; // Format d'affichage Date-fns utilisé par Shadcn

    public function format(string $format): self
    {
        $this->meta['format'] = $format;
        return $this;
    }
}