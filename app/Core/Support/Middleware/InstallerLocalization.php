<?php

namespace App\Core\Support\Middleware;

use Closure;
use Illuminate\Http\Request;

class InstallerLocalization
{
    public function handle(Request $request, Closure $next)
    {

        if (session()->has('installer_locale')) {
            app()->setLocale(session()->get('installer_locale'));
        }

        return $next($request);
    }
}