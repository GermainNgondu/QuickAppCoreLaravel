<?php

namespace App\Core\Domains\Media\Actions;

use Illuminate\Http\JsonResponse;
use App\Core\Domains\Media\MediaManager;
use Lorisleiva\Actions\Concerns\AsAction;

class SearchMediaAction
{
    use AsAction;

    public function __construct(protected MediaManager $manager) {}

    public function handle(): JsonResponse
    {
        request()->validate([
            'query'  => 'required|string|min:3',
            'source' => 'required|string',
            'page'   => 'integer'
        ]);

        $results = $this->manager->driver(request('source'))->search(request('query'), request('page', 1));

        return response()->json([
            'source' => request('source'),
            'results' => $results
        ]);
    }
}