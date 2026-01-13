<?php

namespace App\Core\Domains\Users\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Required;

class LoginData extends Data {
    public function __construct(
        #[Required, Email] public string $email,
        #[Required] public string $password,
        public bool $remember = false
    ) {}
}