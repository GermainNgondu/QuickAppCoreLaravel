<?php

namespace App\Core\Domains\Media\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;

class UpdateMediaData extends Data
{
    public function __construct(
        #[Required]
        public string $name,
        public ?string $alt_text = null,
        public ?string $description = null,
    ) {}
}