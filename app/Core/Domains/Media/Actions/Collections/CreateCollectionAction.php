<?php

namespace App\Core\Domains\Media\Actions\Collections;

use Illuminate\Support\Str;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Core\Domains\Media\Models\MediaCollection;
use App\Core\Domains\Media\Data\MediaCollectionData;



class CreateCollectionAction
{
    use AsAction;

    public function handle(MediaCollectionData $data): MediaCollection
    {
        $attributes = $data->toArray();

        if (empty($attributes['slug'])) {
            $attributes['slug'] = Str::slug($attributes['name']);
        }

        return MediaCollection::create($attributes);
    }

    /**
     * Injection automatique de MediaCollectionData validé.
     */
    public function asController(MediaCollectionData $data)
    {
        $collection = $this->handle($data);

        return response()->json(MediaCollectionData::from($collection), 201);
    }
}