<?php

namespace App\Core\Domains\Media\Actions\Upload;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use App\Core\Domains\Media\Models\Media;
use App\Core\Domains\Media\Models\MediaLibrary;
use App\Core\Domains\Media\Data\MediaData;
use Lorisleiva\Actions\Concerns\AsAction;

class ImportMediaFromUrlAction
{
    use AsAction;

    /**
     * Règles de validation.
     */
    public function rules(): array
    {
        return [
            'url' => 'required|url',
            'type' => 'required|in:image,youtube,unsplash,ai',
            'name' => 'nullable|string|max:255',
        ];
    }

    /**
     * Logique principale d'importation.
     */
    public function handle(string $url, string $type, ?string $name = null): Media
    {
        // SÉCURITÉ : On force le type 'youtube' si l'URL provient de YouTube 
        // pour éviter de télécharger la page HTML par erreur.
        if (str_contains($url, 'youtube.com') || str_contains($url, 'youtu.be')) {
            $type = 'youtube';
        }

        // On utilise la bibliothèque par défaut pour attacher le média
        $mediaModel = MediaLibrary::getDefault();

        if ($type === 'youtube') {
            return $this->handleYouTubeImport($url);
        }

        // --- IMPORTATION D'IMAGE PHYSIQUE ---
        // (URL directe, Pexels, Unsplash ou génération IA)
        $fileName = ($name ? Str::slug($name) : Str::random(20));

        /** @var Media $media */
        $media = $mediaModel->addMediaFromUrl($url)
            ->usingFileName($fileName . '.jpg')
            ->withCustomProperties([
                'source' => $type,
                'original_url' => $url
            ])
            ->toMediaCollection('library');

        return $media;
    }

    /**
     * Gestion spécifique pour YouTube : téléchargement de la miniature.
     */
    protected function handleYouTubeImport(string $url): Media
    {
        $videoId = $this->extractYouTubeId($url);

        // Tentative de récupération de la miniature en haute résolution
        $thumbnailUrl = "https://img.youtube.com/vi/{$videoId}/maxresdefault.jpg";

        // Si la HD n'existe pas, on bascule sur la version standard (HQ)
        if (Http::get($thumbnailUrl)->failed()) {
            $thumbnailUrl = "https://img.youtube.com/vi/{$videoId}/hqdefault.jpg";
        }

        $mediaModel = MediaLibrary::getDefault();

        /** @var Media $media */
        $media = $mediaModel->addMediaFromUrl($thumbnailUrl)
            ->withCustomProperties([
                'youtube_id' => $videoId,
                'video_url' => $url,
                'is_external' => true,
                'type' => 'youtube'
            ])
            ->usingName("YouTube: {$videoId}")
            ->usingFileName("yt_{$videoId}.jpg")
            ->toMediaCollection('library');

        return $media;
    }

    /**
     * Regex pour extraire l'ID vidéo de YouTube.
     */
    protected function extractYouTubeId(string $url): string
    {
        preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?v=|embed\/|v\/))([^\?&\"'>]+)/", $url, $matches);

        if (!isset($matches[1])) {
            throw new \Exception("Impossible d'extraire l'ID de la vidéo YouTube.");
        }

        return $matches[1];
    }

    public function asController(): MediaData
    {
        $media = $this->handle(
            request()->input('url'),
            request()->input('type'),
            request()->input('name')
        );

        return MediaData::from($media);
    }
}