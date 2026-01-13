import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useDynamicForm } from '@hooks';
import { Button } from '@ui';
import { TextInputField, SelectField } from '@ui/fields';
import { AlertCircle, Database } from 'lucide-react';

export function DatabaseStep() {
    const { methods, onSubmit, isSubmitting } = useDynamicForm({
        submitUrl: '/install',
        method: 'POST',
        initialValues: { connection: 'mysql', host: '127.0.0.1', database: '', username: 'root', password: '' }
    });

    const { errors } = methods.formState;
    const connection = methods.watch('connection');

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="space-y-6">
                {errors.database && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex gap-3 animate-in fade-in zoom-in-95">
                        <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                        <div className="text-sm text-red-800">
                            <p className="font-bold">Erreur de connexion</p>
                            <p>{errors.database.message}</p>
                        </div>
                    </div>
                )}

                <SelectField 
                    name="connection" 
                    label="Type de base de données"
                    options={[
                        { value: 'mysql', label: 'MySQL / MariaDB' },
                        { value: 'sqlite', label: 'SQLite (Fichier local)' }
                    ]}
                />

                <div className="grid gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    {connection === 'sqlite' ? (
                        <TextInputField name="database" label="Chemin du fichier" placeholder="database/database.sqlite" required />
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <TextInputField name="host" label="Hôte" placeholder="127.0.0.1" />
                                <TextInputField name="database" label="Nom de la base" placeholder="mon_projet" required />
                            </div>
                            <TextInputField name="username" label="Utilisateur" placeholder="root" />
                            <TextInputField name="password" label="Mot de passe" inputType="password" />
                        </div>
                    )}
                </div>

                <Button type="submit" className="w-full h-11 cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? "Test de connexion..." : "Valider la configuration"}
                </Button>
            </form>
        </FormProvider>
    );
}