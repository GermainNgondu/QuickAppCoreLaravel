<?php

namespace App\Core\Domains\Admin\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\BooleanType;

#[TypeScript]
class SettingData extends Data
{
    public function __construct(
        #[Required, StringType, Max(50)]
        public string $key,

        #[Required]
        public ?string $value,

        #[Required, StringType]
        public ?string $type,

        #[StringType, Max(50)]
        public string $group = 'general',

        #[Nullable,StringType]
        public mixed $description,

        #[BooleanType]
        public mixed $is_locked = 0,
    ) {}
}