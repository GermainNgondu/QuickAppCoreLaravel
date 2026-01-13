<?php

namespace App\Core\Domains\Media\Actions;

use App\Core\Domains\Media\Models\Media;
use App\Core\Domains\Media\Data\UpdateMediaData;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateMediaAction
{
    use AsAction;

    public function handle(Media $media, UpdateMediaData $data)
    {
        // Mise à jour du nom principal
        $media->name = $data->name;

        // Mise à jour des métadonnées SEO dans custom_properties
        $media->setCustomProperty('alt_text', $data->alt_text);
        $media->setCustomProperty('description', $data->description);
        
        $media->save();

        return $media;
    }

    public function asController(Media $media, UpdateMediaData $data)
    {
        $this->handle($media, $data);

        return response()->json([
            'message' => 'Média mis à jour avec succès',
            'refresh' => true
        ]);
    }
}