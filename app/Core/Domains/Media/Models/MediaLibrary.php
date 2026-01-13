<?php

namespace App\Core\Domains\Media\Models;

use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaLibrary extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'media_libraries';
    protected $fillable = ['name', 'slug'];

    /**
     * Singleton : Récupère la bibliothèque par défaut.
     */
    public static function getDefault(): self
    {
        return self::firstOrCreate(
            ['slug' => 'default'],
            ['name' => 'Bibliothèque Principale']
        );
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(200)
            ->height(200)
            ->sharpen(10);

        $this->addMediaConversion('webp')
            ->format('webp')
            ->quality(80)
            ->queued();
    }
}