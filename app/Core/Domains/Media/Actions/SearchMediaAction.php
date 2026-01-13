<?php

namespace App\Core\Domains\Media\Actions;

use Illuminate\Http\Request;
use App\Core\Domains\Media\MediaManager;
use Lorisleiva\Actions\Concerns\AsAction;

class SearchMediaAction
{
    use AsAction;

    public function __construct(protected MediaManager $manager) {}

    public function asController(Request $request)
    {
        // On valide le terme de recherche
        $request->validate([
            'query'  => 'required|string|min:3',
            'source' => 'required|string', // ex: 'unsplash'
            'page'   => 'integer'
        ]);

        return $this->handle(
            $request->input('source'),
            $request->input('query'),
            $request->input('page', 1)
        );
    }

    public function handle(string $source, string $query, int $page)
    {
        // On demande au manager de nous donner le driver et d'exécuter la recherche
        $results = $this->manager->driver($source)->search($query, $page);

        return response()->json([
            'source' => $source,
            'results' => $results
        ]);
    }
}