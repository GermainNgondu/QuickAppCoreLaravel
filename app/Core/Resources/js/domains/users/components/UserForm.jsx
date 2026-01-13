import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useDynamicForm } from '@/hooks/useDynamicForm';
import { Button } from '@ui';
import {TextInputField, SelectField } from '@ui/fields';
import { User, Mail, Shield, Lock, Save } from 'lucide-react';

export default function UserForm({ user = null, submitUrl, method = 'POST' }) {
    // Si 'user' est présent, nous sommes en mode EDITION
    const isEditing = !!user;

    const { methods, onSubmit, isSubmitting } = useDynamicForm({
        submitUrl: submitUrl,
        method: method,
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            role: user?.role || 'user',
            password: '', // Toujours vide au départ
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Section Informations de base */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <User className="w-4 h-4" /> Informations Générales
                        </h3>
                        
                        <TextInputField 
                            name="name" 
                            label="Nom complet" 
                            placeholder="ex: John Doe"
                            required 
                        />

                        <TextInputField 
                            name="email" 
                            label="Adresse Email" 
                            inputType="email"
                            placeholder="john@exemple.com"
                            required 
                        />
                    </div>

                    {/* Section Sécurité et Rôles */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Accès et Sécurité
                        </h3>

                        <SelectField 
                            name="role" 
                            label="Rôle utilisateur"
                            options={[
                                { value: 'user', label: 'Utilisateur Standard' },
                                { value: 'admin', label: 'Administrateur' },
                                { value: 'super-admin', label: 'Super Administrateur' },
                            ]}
                            required
                        />

                        <TextInputField 
                            name="password" 
                            label={isEditing ? "Changer le mot de passe" : "Mot de passe"} 
                            inputType="password"
                            placeholder={isEditing ? "Laisser vide pour ne pas modifier" : "••••••••"}
                            required={!isEditing} // Obligatoire seulement à la création
                            icon={<Lock className="w-4 h-4 text-slate-400" />}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                    <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => window.history.back()}
                        disabled={isSubmitting}
                    >
                        Annuler
                    </Button>
                    <Button 
                        type="submit" 
                        className="bg-zinc-600 hover:bg-zinc-700 text-white min-w-[140px] cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Enregistrement..." : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                {isEditing ? "Mettre à jour" : "Créer l'utilisateur"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}