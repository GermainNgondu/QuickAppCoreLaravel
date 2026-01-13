<?php

namespace App\Core\Domains\Users\Actions;

use Illuminate\Support\Str;
use App\Core\Framework\UI\UIPage;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Core\Domains\Users\Data\LoginData;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class LoginUserAction 
{
    use AsAction;
    
    public function authorize(): bool
    {
        return Auth::guest();
    }

    public function handle(LoginData $data): bool
    {
        $throttleKey = Str::lower($data->email) . '|' . request()->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            throw ValidationException::withMessages([
                'email' => __('auth.throttle', [
                    'seconds' => RateLimiter::availableIn($throttleKey)
                ]),
            ]);
        }

        if (!Auth::attempt($data->only('email', 'password')->toArray(), $data->remember)) {
            RateLimiter::hit($throttleKey);
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        RateLimiter::clear($throttleKey);
        
        request()->session()->regenerate();

        return true;
    }

    public function asController() {
        if (request()->isMethod('get')) {
            return UIPage::make('Connexion')
                ->type('auth')
                ->options(['component' => 'Core::users/Login'])
                ->render();
        }

        $data  = LoginData::validateAndCreate(request()->all());

        $this->handle($data);

        $redirect = redirect()->intended(route('admin.dashboard'));

        if (request()->wantsJson()) {
            return response()->json([
                'redirect' => $redirect->getTargetUrl(),
                'message'=> __('connexion réussi')
            ]);
        }

        return $redirect;
    }
}