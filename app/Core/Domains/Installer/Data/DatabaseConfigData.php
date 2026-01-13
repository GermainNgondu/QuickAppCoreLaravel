<?php

namespace App\Core\Domains\Installer\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Required;

class DatabaseConfigData extends Data
{
    public function __construct(
        #[Required] public string $connection,
        public ?string $host,
        #[Required] public string $database,
        public ?string $username,
        public ?string $password,
        public ?string $port,
    ) {}
}