<?php

namespace App\Core\Domains\Media\Actions\Upload;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Core\Domains\Media\Data\MediaData;
use App\Core\Domains\Media\Models\MediaLibrary;

class UploadMediaAction
{
    use AsAction;

    /**
     * Gère la requête HTTP pour l'upload.
     */
    public function asController(Request $request): JsonResponse
    {
        $maxSizeInBytes = config('media-library.max_file_size', 536870912); // 512MB par défaut
        $maxSizeInKb = $maxSizeInBytes / 1024;
        $allowedMimes = implode(',', [
            // Images
            'jpeg', 'png', 'jpg', 'gif', 'webp', 'svg', 'bmp', 'tiff',
            // Documents
            'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv', 'rtf',
            // Archives
            'zip', 'rar', '7z',
            // Audio / Vidéo
            'mp3', 'wav', 'mp4', 'webm', 'avi', 'mov'
        ]);

        $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:' . $allowedMimes, 
                'max:' . $maxSizeInKb
            ],
            'collection' => 'string|nullable'
        ]);

        $media = $this->handle(
            $request->file('file'),
            $request->input('collection', 'default')
        );

        return response()->json(MediaData::fromUploadedMedia($media));
    }

    /**
     * Ajout au modèle central MediaLibrary.
     */
    public function handle($file, string $collection = 'default')
    {
        $library = MediaLibrary::getDefault();

        return $library->addMedia($file)
            ->withCustomProperties([
                'user_id' => auth()->id(),
                'original_name' => $file->getClientOriginalName(),
                'type' => $this->getFileType($file->getMimeType()),
            ])
            ->toMediaCollection($collection);
    }

    /**
     * Helper pour déterminer le type global du fichier
     */
    protected function getFileType(string $mime): string
    {
        return match (true) {
            str_starts_with($mime, 'image/') => 'image',
            str_starts_with($mime, 'video/') => 'video',
            str_starts_with($mime, 'audio/') => 'audio',
            $mime === 'application/pdf' => 'pdf',
            default => 'document',
        };
    }
}