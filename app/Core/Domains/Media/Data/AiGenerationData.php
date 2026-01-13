<?php

namespace App\Core\Domains\Media\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;

class AiGenerationData extends Data
{
    public function __construct(
        #[Required]
        public string $prompt,
        public string $size = '1024x1024', // Standard DALL-E
        public string $quality = 'standard'
    ) {}
}