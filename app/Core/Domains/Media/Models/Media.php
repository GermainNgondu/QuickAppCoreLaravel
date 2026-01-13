<?php

namespace App\Core\Domains\Media\Models;

use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;

class Media extends SpatieMedia
{
    use SoftDeletes, Prunable;

    /**
     * Les attributs à ajouter à la conversion JSON.
     */
    protected $appends = ['url', 'thumb_url', 'size_human'];

    /**
     * Récupère le texte ALT depuis les propriétés personnalisées.
     */
    public function getAltTextAttribute(): string
    {
        return $this->getCustomProperty('alt_text', '');
    }

    /**
     * Récupère la description depuis les propriétés personnalisées.
     */
    public function getDescriptionAttribute(): string
    {
        return $this->getCustomProperty('description', '');
    }

    /**
     * URL complète du fichier original.
     */
    public function getUrlAttribute(): string
    {
        return $this->getFullUrl();
    }

    public function getTypeAttribute(): string
    {
        if ($this->getCustomProperty('source') === 'youtube') {
            return 'youtube';
        }

        $mime = $this->mime_type;

        if (str_starts_with($mime, 'image/'))
            return 'image';
        if (str_starts_with($mime, 'video/'))
            return 'video';
        if (str_starts_with($mime, 'audio/'))
            return 'audio';
        if (in_array($mime, ['application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])) {
            return 'document';
        }

        return 'other';
    }

    /**
     * URL de la miniature (si elle existe, sinon l'original).
     */
    public function getThumbUrlAttribute(): string
    {
        return $this->hasGeneratedConversion('thumb')
            ? $this->getFullUrl('thumb')
            : $this->getFullUrl();
    }

    /**
     * Taille du fichier formatée (ex: 1.2 MB).
     */
    public function getSizeHumanAttribute(): string
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        if ($this->size == 0) {
            return '0 B';
        }

        $i = floor(log($this->size, 1024));
        return round($this->size / pow(1024, $i), 2) . ' ' . $units[$i];
    }

    public function getHumanReadableSize(): string
    {
        return $this->size_human;
    }
    
    /**
     * Détermine la requête pour les enregistrements à supprimer définitivement.
     * Tous les médias dans la corbeille depuis plus de 30 jours seront ciblés.
     */
    public function prunable()
    {
        return static::onlyTrashed()->where('deleted_at', '<=', now()->subDays(30));
    }

    /**
     * Logique à exécuter juste avant la suppression définitive.
     */
    protected function pruning()
    {
        Log::info("Le média {$this->id} a été supprimé par le nettoyage automatique.");
    }

    /**
     * Scope pour filtrer par source (stockée dans custom_properties).
     */
    public function scopeFromSource($query, string $source)
    {
        return $query->where('custom_properties->source', $source);
    }
}