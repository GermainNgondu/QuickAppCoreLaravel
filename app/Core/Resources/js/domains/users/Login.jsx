import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useDynamicForm } from '@hooks';
import { Button } from '@ui';
import { TextInputField, CheckboxField } from '@ui/fields';
import { LogIn, Mail, Lock } from 'lucide-react';
import { __ } from '@/lib';

export default function Login() {
    const { methods, onSubmit, isSubmitting } = useDynamicForm({
        submitUrl: '/admin/login',
        method: 'POST',
        initialValues: { email: '', password: '', remember: false }
    });

    return (
        <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-2xl shadow-xl ring-1 ring-slate-200">
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 capitalize">{__('connexion')}</h1>
                <p className="text-sm text-slate-500 mt-2">Connectez-vous à votre compte administrateur</p>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <TextInputField 
                            name="email" 
                            label="Email" 
                            placeholder="admin@exemple.com"
                            icon={<Mail className="w-4 h-4 text-slate-400" />}
                            required 
                        />
                        
                        <TextInputField 
                            name="password" 
                            label="Mot de passe" 
                            inputType="password" 
                            placeholder="••••••••"
                            icon={<Lock className="w-4 h-4 text-slate-400" />}
                            required 
                        />
                    </div>

                    <div className="flex items-center justify-between">
                       
                        <a href="#" className="text-sm font-semibold text-zinc-600 hover:text-zinc-500">
                            Mot de passe oublié ?
                        </a>
                    </div>

                    <Button type="submit" className="w-full h-11 bg-zinc-600 hover:bg-zinc-700 cursor-pointer" disabled={isSubmitting}>
                        {isSubmitting ? "Connexion..." : "Se connecter"}
                        {!isSubmitting && <LogIn className="ml-2 w-4 h-4" />}
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
}