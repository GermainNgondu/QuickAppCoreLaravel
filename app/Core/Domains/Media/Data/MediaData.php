<?php

namespace App\Core\Domains\Media\Data;

use App\Core\Domains\Media\Models\Media;
use Spatie\LaravelData\Data;
use Illuminate\Support\Carbon;

class MediaData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $file_name,
        public string $url,
        public ?string $thumb_url,
        public string $type,
        public string $mime_type,
        public string $size_human,
        public ?string $extension,
        public ?array $custom_properties,
        public Carbon $created_at,
    ) {}

    /**
     * Transforme le modèle Eloquent en objet Data (DTO) pour le Frontend.
     */
    public static function fromModel(Media $media): self
    {
        // 1. Détermination du type intelligent
        $type = 'document';
        
        // Si c'est un format image classique
        if (str_starts_with($media->mime_type, 'image/')) {
            $type = 'image';
        } 
        
        // Si c'est un format vidéo classique (local)
        elseif (str_starts_with($media->mime_type, 'video/')) {
            $type = 'video';
        }

        /**
         * Si le média possède un ID YouTube dans ses propriétés personnalisées,
         * on force le type à 'youtube' pour que le frontend affiche l'iframe.
         */
        if ($media->hasCustomProperty('youtube_id')) {
            $type = 'youtube';
        }

        return new self(
            id: $media->id,
            name: $media->name,
            file_name: $media->file_name,
            url: $media->getFullUrl(),
            thumb_url: $media->hasGeneratedConversion('thumb') 
                ? $media->getFullUrl('thumb') 
                : $media->getFullUrl(),
            type: $type,
            mime_type: $media->mime_type,
            size_human: $media->getSizeHumanAttribute(),
            extension: pathinfo($media->file_name, PATHINFO_EXTENSION),
            custom_properties: $media->custom_properties,
            created_at: $media->created_at,
        );
    }
}