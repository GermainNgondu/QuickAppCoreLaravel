<?php

namespace App\Core\Domains\Admin\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Url;
use Spatie\LaravelData\Attributes\Validation\Nullable;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Attributes\Validation\BooleanType;

#[TypeScript]
class SettingsAppData extends Data
{
    public function __construct(
        #[Required, StringType, Max(50)]
        public string $app_name,

        #[Nullable, StringType, Max(255)]
        public ?string $app_description,

        #[Nullable, Url]
        public ?string $app_url,

        #[Nullable]
        public mixed $app_logo,

        #[Nullable]
        public mixed $app_favicon,

        #[Required]
        public string $app_locale,

        #[Required, StringType]
        public string $app_timezone,

        #[BooleanType]
        public bool $maintenance_mode,
    ) {}
}