import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useDynamicForm } from '@hooks';
import { Button } from '@ui';
import { SelectField } from '@ui/fields';
import { Languages } from 'lucide-react';

export function LanguageStep({ available_languages }) {
    const { methods, onSubmit, isSubmitting } = useDynamicForm({
        submitUrl: '/install',
        method: 'POST',
        initialValues: { 

            locale: window.App?.locale || 'en' 
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="space-y-8 py-4">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Languages className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                            Sélectionnez la langue principale pour l'installation et l'administration.
                        </p>
                    </div>
                </div>

                <div className="w-52 mx-auto">
                    <SelectField 
                        name="locale" 
                        label=""
                        options={available_languages} 
                        required
                    />
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <Button 
                        type="submit" 
                        className="w-full h-11 cursor-pointer" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Chargement..." : "Continuer vers les prérequis"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}