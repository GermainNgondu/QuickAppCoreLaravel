<?php

namespace App\Core\Domains\Users\Actions;

use App\Core\Actions\BaseAction;
use Illuminate\Support\Facades\Auth;
class LogoutUserAction extends BaseAction
{
    public function handle(): void
    {
        Auth::logout();
        session()->invalidate();
        session()->regenerateToken();
    }

    public function asController()
    {
        $this->handle();
        return redirect()->route('login');
    }
}