<?php

namespace App\Core\Domains\Media\Actions;

use App\Core\Domains\Media\Models\MediaLibrary;
use App\Core\Domains\Media\Data\MediaData;
use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;

class UploadMediaAction
{
    use AsAction;

    /**
     * Gère la requête HTTP pour l'upload.
     */
    public function asController(Request $request)
    {
        // 1. Validation stricte du fichier
        $request->validate([
            'file' => [
                'required',
                'file',
                'image', 
                'mimes:jpeg,png,jpg,gif,webp', 
                'max:10240' // 10MB max
            ],
            'collection' => 'string|nullable'
        ]);

        // 2. Exécution de la logique métier
        $media = $this->handle(
            $request->file('file'),
            $request->input('collection', 'default')
        );

        // 3. Retourne le DTO formaté pour le MediaPicker React
        return response()->json(MediaData::from($media));
    }

    /**
     * Logique métier : Ajout au modèle central MediaLibrary.
     */
    public function handle($file, string $collection = 'default')
    {
        // On récupère ou crée la bibliothèque par défaut (Singleton)
        $library = MediaLibrary::getDefault();

        return $library->addMedia($file)
            ->withCustomProperties([
                'user_id' => auth()->id(), // On garde l'ID de l'uploader pour la traçabilité
                'original_name' => $file->getClientOriginalName(),
            ])
            ->toMediaCollection($collection);
    }
}