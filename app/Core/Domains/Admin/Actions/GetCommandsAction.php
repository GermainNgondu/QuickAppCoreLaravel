<?php

namespace App\Core\Domains\Admin\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use App\Core\Framework\Managers\CommandManager;


class GetCommandsAction
{
    use AsAction;

    public function handle(CommandManager $manager)
    {
        return response()->json([
            'data' => $manager->getCommands()
        ]);
    }
}