import React from 'react';
import { useDynamicForm } from '@hooks';
import { Button } from '@ui';
import { CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';

export function RequirementsStep({ requirements, isReady }) {
    const { onSubmit, isSubmitting } = useDynamicForm({
        submitUrl: '/install',
        method: 'POST',
        initialValues: { next: true }
    });

    const renderCheck = (label, status) => (
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            {status ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ) : (
                <XCircle className="h-5 w-5 text-red-500" />
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Configuration PHP</h3>
                {renderCheck(`PHP >= 8.2.0 (Actuel: ${requirements.php_version || '?'})`, requirements.php)}
                
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Extensions Requises</h3>
                <div className="grid grid-cols-2 gap-2">
                    {Object.entries(requirements.extensions).map(([name, status]) => (
                        renderCheck(name, status)
                    ))}
                </div>

                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Permissions Dossiers</h3>
                {Object.entries(requirements.permissions).map(([name, status]) => (
                    renderCheck(`Dossier ${name}`, status)
                ))}
            </div>

            {!isReady && (
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex gap-3">
                    <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
                    <p className="text-xs text-amber-800">
                        Certains prérequis ne sont pas remplis. Veuillez corriger la configuration de votre serveur pour continuer.
                    </p>
                </div>
            )}

            <form onSubmit={onSubmit}>
                <Button type="submit" className="w-full h-11 cursor-pointer" disabled={!isReady || isSubmitting}>
                    {isSubmitting ? "Chargement..." : "Vérifier la base de données"}
                </Button>
            </form>
        </div>
    );
}