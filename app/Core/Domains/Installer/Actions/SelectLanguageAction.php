<?php

namespace App\Core\Domains\Installer\Actions;

use App\Core\Actions\BaseAction;
use App\Core\Framework\UI\UIPage;
use Illuminate\Support\Facades\Artisan;
use App\Core\Framework\Managers\EnvManager;
use App\Core\Framework\Managers\TranslationManager;

class SelectLanguageAction extends BaseAction
{
    /**
     * Gère l'affichage (GET) et la soumission (POST)
     */
    public function asController()
    {
        $languages = TranslationManager::getAvailableLocales();

        $locales = collect($languages)->implode('code', ',');

        if (request()->isMethod('post')) 
        {
            request()->validate(['locale' => 'required|in:' . $locales]);

            $locale = request()->get('locale');

            EnvManager::init()->set('APP_LOCALE', $locale);
            
            app()->setLocale($locale);
            
            Artisan::call('config:clear');

            session()->put('installer_step', 1);

            return response()->json([
                'message' => 'Langue configurée',
                'redirect' => route('installer.master')
            ]);
        }

        return UIPage::make('Installation — Langue')
            ->type('wizard')
            ->data([
                'step' => 0,
                'available_languages' => collect($languages)->map(function ($language) {
                    return [
                        'value' => $language['code'],
                        'label' => $language['label']
                    ];
                })->toArray()
            ])
            ->options(['component' => 'Core::installer/InstallerWizard'])
            ->render();
    }
}