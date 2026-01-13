import React, { Suspense, lazy, useMemo } from 'react';
import { AdminLayout, AuthLayout, SimpleLayout } from '@layouts';
import { DataTable, DynamicForm, DataView } from '@composite';
import { SchemaRenderer, EmptyPagePlaceholder } from '@shared';
import { Skeleton } from '@ui';

const domainComponents = import.meta.glob('../../domains/**/*.jsx');

/**
 * Alignement avec UIPage PHP :
 * @param {string} title - Titre de la page
 * @param {string} type - Type de rendu ('page', 'wizard', 'auth', etc.)
 * @param {Object} schema - Structure dynamique (pour les formulaires/tables)
 * @param {Object} data - Données métier
 * @param {Object} options - Configuration (contient le nom du composant)
 */
export default function GenericPage({ title, type, schema, data, options = {} }) {
    
    const componentSelector = options?.component;
    
    // Résolution du composant spécifique
    const InnerComponent = useMemo(() => {
        if (!componentSelector) return null;

        // "Core::domains/installer/InstallerWizard" -> "domains/installer/InstallerWizard"
        const parts = componentSelector.split('::');
        const path = parts.length > 1 ? parts[1] : parts[0];
        
        // On construit le chemin relatif exact tel qu'il apparaît dans le glob
        // Le chemin doit correspondre à la structure réelle des dossiers
        const fullPath = `../../domains/${path}.jsx`;

        // On vérifie si le fichier existe dans notre liste d'imports
        const importFn = domainComponents[fullPath];

        if (!importFn) {
            console.error(`[Resolver] Chemin introuvable dans le Glob : ${fullPath}`);
            return null;
        }

        return lazy(importFn);
    }, [componentSelector]);

    // Logique de rendu dynamique
    const renderContent = () => {

        if (InnerComponent) {
            return (
                <Suspense fallback={<PageSkeleton />}>
                    <InnerComponent title={title} schema={schema} {...data} {...options}/>
                </Suspense>
            );
        }

        switch (type) {
            case 'table':
            case 'datatable':
                return <DataTable {...options} {...schema} initialData={data} title={title}/>
            
            case 'form':
            case 'dynamicform':
                return <DynamicForm title={title} fields={schema} submitUrl={options?.submitUrl} method={options?.method} data={data} />;
            
            case 'view':
            case 'dataview':
                return <DataView title={title} schema={schema} data={data} />;

            case 'page':

                if (schema?.length > 0) return <SchemaRenderer schema={schema} data={data} />;
                return <EmptyPagePlaceholder />;

            default:
                return <EmptyPagePlaceholder />;
        }
    };

    // Choix du Layout
    const layoutType = options?.layout || (['auth', 'wizard'].includes(type) ? type : 'admin');

    switch (layoutType) {
        case 'wizard': return <div className="bg-slate-50">{renderContent()}</div>;
        case 'auth':   return <AuthLayout title={title}>{renderContent()}</AuthLayout>;
        default:       return <AdminLayout title={data.title || options.title}>{renderContent()}</AdminLayout>;
    }
}

/**
 * Petit loader d'attente
 */
function PageSkeleton() {
    return (
        <div className="space-y-4 p-8">
            <Skeleton className="h-12 w-[250px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
        </div>
    );
}