<?php

namespace App\Core\Domains\Installer\Actions;

use App\Core\Actions\BaseAction;


class InstallerMasterAction extends BaseAction
{
    public function asController()
    {
        // On récupère l'étape actuelle en session (par défaut 0)
        $step = session('installer_step', 0);

        // On délègue le travail à l'action de l'étape correspondante
        return match ($step) {
            0 => app(SelectLanguageAction::class)->asController(),
            1 => app(CheckRequirementsAction::class)->asController(),
            2 => app(SetupDatabaseAction::class)->asController(),
            3 => app(RunMigrationsAction::class)->asController(),
            4 => app(CreateInitialAdminAction::class)->asController(),
            default => redirect('/'),
        };
    }
}