import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useDynamicForm } from '@/hooks';
import { TextInputField, CheckboxField,MediaInputField } from '@ui/fields';
import { Button } from '@ui';
import { 
    Settings, 
    Globe, 
    Mail, 
    Type, 
    ShieldAlert, 
    Save, 
    Info 
} from 'lucide-react';

export default function SettingsForm({ settings, submit_url, method = 'PUT' }) {

    // Initialisation du formulaire avec les données provenant du Backend (UIPage::data)
    const { methods, onSubmit, isSubmitting } = useDynamicForm({
        submitUrl: submit_url,
        method: method,
        initialValues: {
            app_name: settings?.app_name || '',
            app_description: settings?.app_description || '',
            app_url: settings?.app_url || window.App?.url || '',
            app_logo: settings?.app_logo || '',
            app_favicon: settings?.app_favicon || '',
            app_locale: settings?.app_locale || window.App?.locale || 'en',
            app_timezone: settings?.app_timezone || 'UTC',
            maintenance_mode: settings?.maintenance_mode || false,
        }
    });

    return (
        <FormProvider {...methods}>
            <div className='w-full max-w-4xl mx-auto py-5'>
                <form onSubmit={onSubmit} className="space-y-8">
                    
                    {/* Section : Identité de l'application */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-zinc-600" />
                                Identité
                            </h3>
                            <p className="text-sm text-slate-500">
                                Configurez les informations publiques de votre plateforme.
                            </p>
                        </div>
                        
                        <div className="lg:col-span-2 space-y-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <TextInputField 
                                name="app_name" 
                                label="Nom de l'application" 
                                placeholder="Mon Super Projet"
                                icon={<Type className="w-4 h-4 text-slate-400" />}
                                required 
                            />
                            <MediaInputField 
                                name="app_logo" 
                                label="Logo" 
                                accept="image"
                                description="Format suggéré : 512x512px."
                            />
                            <MediaInputField 
                                name="app_favicon" 
                                label="Favicon"
                                accept="image"
                                description="Format suggéré : 32x32px."
                            />
                            <TextInputField 
                                name="app_url" 
                                label="Url"
                                icon={<Type className="w-4 h-4 text-slate-400" />}
                            />
                            <TextInputField 
                                name="app_description" 
                                label="Description" 
                                placeholder="Une brève description pour le SEO..."
                            />
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Section : Contact & Footer */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-zinc-600" />
                                Communication
                            </h3>
                            <p className="text-sm text-slate-500">
                                Gérez les points de contact et les mentions légales.
                            </p>
                        </div>

                        <div className="lg:col-span-2 space-y-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <TextInputField 
                                name="contact_email" 
                                label="Email de contact" 
                                inputType="email"
                                placeholder="admin@domaine.com"
                                icon={<Mail className="w-4 h-4 text-slate-400" />}
                                required 
                            />

                            <TextInputField 
                                name="footer_text" 
                                label="Texte du pied de page" 
                                placeholder="© 2026 CoreFramework - Tous droits réservés"
                            />
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Section : Maintenance & Sécurité */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-amber-600" />
                                Maintenance
                            </h3>
                            <p className="text-sm text-slate-500">
                                Contrôlez l'accessibilité de la plateforme.
                            </p>
                        </div>

                        <div className="lg:col-span-2 p-6 bg-amber-50/50 rounded-xl border border-amber-100 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-amber-900">Mode Maintenance</label>
                                    <p className="text-xs text-amber-700/70">
                                        Une fois activé, seuls les administrateurs pourront accéder à l'interface publique.
                                    </p>
                                </div>
                                <CheckboxField 
                                    name="maintenance_mode" 
                                    label="Activer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Barre d'actions fixe ou en bas */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
                        <div className="mr-auto flex items-center gap-2 text-xs text-slate-400 italic">
                            <Info className="w-4 h-4" />
                            Les modifications sont appliquées instantanément sur tout le site.
                        </div>
                        
                        <Button 
                            type="submit" 
                            className="bg-zinc-600 hover:bg-zinc-700 text-white shadow-lg shadow-zinc-200 px-8 cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enregistrement..." : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Enregistrer les réglages
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}