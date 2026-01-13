<?php

namespace App\Core\Domains\Media\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Min;

class UnsplashSearchData extends Data
{
    public function __construct(
        #[Required, Min(3)]
        public string $query,
        public int $page = 1,
        public int $per_page = 20
    ) {}
}