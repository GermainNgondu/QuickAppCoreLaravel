<?php

namespace App\Core\Domains\Media\Actions;

use App\Core\Actions\BaseAction;
use Illuminate\Http\JsonResponse;
use App\Core\Domains\Media\Models\Media;
use App\Core\Domains\Media\Data\MediaData;


class ListMediaLibraryAction extends BaseAction
{
    public function handle(): JsonResponse
    {
        $query = Media::query();

        if (request()->input('status') === 'trash') {
            $query->onlyTrashed();
        }

        // Filtre par recherche texte
        $query->when(request()->input('search'), function ($q, $search) {
            $q->where('name', 'like', "%{$search}%");
        });

        // Filtre par TYPE (Logique améliorée)
        $query->when(request()->input('type'), function ($q, $type) {
            return match ($type) {
                'image'    => $q->where('mime_type', 'like', 'image/%'),
                'video'    => $q->where('mime_type', 'like', 'video/%'),
                'audio'    => $q->where('mime_type', 'like', 'audio/%'),
                'document' => $q->whereIn('mime_type', [
                        'application/pdf', 'application/msword', 
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    ]),
                    'youtube'  => $q->where('custom_properties->source', 'youtube'),
                    default    => $q,
                };
        });

        // FILTRE PAR COLLECTION
        if (request()->filled('collection')) {
            $query->where('collection_name', request()->collection);
        }

        // TRI DYNAMIQUE
        $sortBy = request()->input('sort_by', 'created_at');
        $sortOrder = request()->input('sort_order', 'desc');
       
        // Sécurité sur les colonnes de tri
        if (in_array($sortBy, ['name', 'size', 'created_at'])) {

            $query->orderBy($sortBy, $sortOrder); 
        }

        $media = $query->paginate(request()->input('per_page', 24));

        return response()->json([
            'data' => MediaData::collect($media->items()),
            'meta' => [
                'current_page' => $media->currentPage(),
                'last_page'    => $media->lastPage(),
            ]
        ]);        
    }
}