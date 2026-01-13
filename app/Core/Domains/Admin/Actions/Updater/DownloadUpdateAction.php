<?php

namespace App\Core\Domains\Admin\Actions\Updater;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\File;


class DownloadUpdateAction
{
    use AsAction;

    public function handle(string $url): string
    {
        $path = storage_path('app/updates/update.zip');
        
        if (!File::isDirectory(dirname($path))) {
            File::makeDirectory(dirname($path), 0755, true);
        }

        // Streaming du téléchargement pour éviter memory_limit sur gros fichiers
        File::put($path, Http::get($url)->body());

        return $path;
    }

    public function asController(Request $request)
    {
        $request->validate(['url' => 'required|url']);
        
        try {
            $this->handle($request->input('url'));
            return response()->json(['status' => 'downloaded']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}