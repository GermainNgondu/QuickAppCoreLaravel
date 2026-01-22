<?php

namespace App\Core\Domains\Media\Data;


use Spatie\LaravelData\Data;
use App\Core\Domains\Media\Models\MediaCollection;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Attributes\Validation\Unique;

class MediaCollectionData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule('required|string|max:255')]
        public string $name,
        #[Rule('nullable|string|max:255|alpha_dash')]
        #[Unique('media_collections', 'slug', ignore: 'id')]
        public ?string $slug,

        #[Rule('nullable|string|max:50')]
        public ?string $icon,

        #[Rule('nullable|string')]
        public ?string $description,
    ) {}

    public static function fromModel(MediaCollection $collection): self
    {
        return new self(
            id: $collection->id,
            name: $collection->name,
            slug: $collection->slug,
            icon: $collection->icon,
            description: $collection->description
        );
    }
}