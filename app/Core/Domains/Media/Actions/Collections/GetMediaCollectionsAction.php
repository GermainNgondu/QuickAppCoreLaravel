<?php

namespace App\Core\Domains\Media\Actions\Collections;

use Lorisleiva\Actions\Concerns\AsAction;
use App\Core\Domains\Media\Models\MediaCollection;
use App\Core\Domains\Media\Data\MediaCollectionData;


class GetMediaCollectionsAction
{
    use AsAction;

    public function handle()
    {
        $collections = MediaCollection::orderBy('name')->get();

        return MediaCollectionData::collect($collections);
    }
}