<?php

namespace App\Core\Domains\Installer\Data;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Password;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Confirmed;

class AdminSetupData extends Data
{
    public function __construct(
        #[Required, Min(3)]
        public string $name,

        #[Required, Email]
        public string $email,

        #[Required, Password(min: 8, letters: true, mixedCase: true), Confirmed]
        public string $password,

        public ?string $password_confirmation,
    ) {}

    /**
     * Règles de messages personnalisées (Optionnel)
     */
    public static function messages(...$args): array
    {
        return [
            'name.min' => 'Le nom doit contenir au moins 3 caractères.',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
            'email.email' => 'Veuillez entrer une adresse email valide.',
        ];
    }
}