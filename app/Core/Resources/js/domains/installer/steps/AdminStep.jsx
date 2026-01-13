import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useDynamicForm } from '@hooks';
import { Button } from '@ui';
import { TextInputField } from '@ui/fields';

export function AdminStep() {
    const { methods, onSubmit, isSubmitting } = useDynamicForm({
        submitUrl: '/install',
        method: 'POST',
        initialValues: { name: '', email: '', password: '', password_confirmation: '' }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="space-y-4">
                <TextInputField 
                    name="name" 
                    label="Nom complet" 
                    placeholder="John Doe" 
                    required 
                />
                
                <TextInputField 
                    name="email" 
                    label="Adresse Email" 
                    inputType="email" 
                    placeholder="admin@example.com"
                    help="Vous utiliserez cet email pour vous connecter."
                    required 
                />
                
                <div className="grid grid-cols-2 gap-4">
                    <TextInputField 
                        name="password" 
                        label="Mot de passe" 
                        inputType="password" 
                        required 
                    />
                    <TextInputField 
                        name="password_confirmation" 
                        label="Confirmation" 
                        inputType="password" 
                        required 
                    />
                </div>

                <Button type="submit" className="w-full mt-6 cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? "Finalisation..." : "Créer mon compte Admin"}
                </Button>
            </form>
        </FormProvider>
    );
}