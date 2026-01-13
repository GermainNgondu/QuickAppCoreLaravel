<?php

namespace App\Core\Domains\Media\Actions;

use App\Core\Domains\Media\MediaManager;
use App\Core\Domains\Media\Data\AiGenerationData;
use Lorisleiva\Actions\Concerns\AsAction;

class GenerateAiMediaAction
{
    use AsAction;

    public function __construct(protected MediaManager $manager) {}

    public function asController(AiGenerationData $data)
    {
        // Le driver IA retourne un tableau standardisé d'images générées
        $results = $this->manager->driver('ai')->search($data->prompt);

        return response()->json([
            'results' => $results
        ]);
    }
}