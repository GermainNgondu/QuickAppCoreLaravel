<?php

namespace App\Core\Domains\Users\Data;

use Spatie\LaravelData\Data;
use App\Core\Domains\Users\Models\User;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public array $permissions = [],
        public ?string $avatar_url = null,
        public array $metadata = [],
    ) {}

    public static function fromModel(User $user): self
    {
        return self::from([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
            'avatar_url' => $user->avatar_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($user->name),
            'metadata' => $user->metadata,
        ]);
    }
}