<?php

namespace App\Core\Domains\Installer\Actions;

use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Core\Domains\Users\Models\User;
use App\Core\Domains\Installer\Data\AdminSetupData;

class CreateInitialAdminAction extends BaseAction
{
    public function handle(AdminSetupData $data): User
    {
        $user =  User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => Hash::make($data->password),
            'email_verified_at' => now(),
        ]);

        $role = Role::where('name', 'super')->where('guard_name', 'web')->first();

        if (method_exists($user, 'assignRole') && $role) {
            $user->assignRole($role);
        }

        return $user;
    }

    public function asController()
    {
        $data = request()->all();

        if ($data && request()->isMethod('post')) 
        {
            $data = AdminSetupData::validateAndCreate($data);

            $this->handle($data);

            FinalizeInstallationAction::run();

            return response()->json([
                'message' => 'Installation terminée !',
                'redirect' => url('/')
            ]);
        }

        return UIPage::make('Compte Administrateur')
            ->type('wizard')
            ->data(['step' => 4])
            ->options(['component' => 'Core::installer/InstallerWizard'])
            ->render();
    }

    
}