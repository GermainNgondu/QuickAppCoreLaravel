import './bootstrap';
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadTranslations } from '@lib';
import { Toaster } from 'sonner';

// Simple loader for waiting (Suspense)
const PageLoader = () => (
    <div className="flex h-full w-full items-center justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
);

/**
 * CONFIGURATION DU CLIENT DE REQUÊTE (TanStack Query)
 */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000,
        },
    },
});

/**
 * SCANNER DE COMPOSANTS (Importation Globale)
 */
const globImports = import.meta.glob([
    '../components/composite/**/*.jsx',
    '../domains/**/*.jsx',
    '../layouts/**/*.jsx',
    '../../../../Features/**/Resources/js/components/**/*.jsx' 
], { eager: false });

/**
 * RÉSOLVEUR DE CHEMINS (The Brain)
 */
const resolveComponent = (name) => {
    if (!name) return null;

    const [namespace, componentPath] = name.split('::');
    
    // On nettoie le chemin au cas où on aurait mis des slashs au début ou des extensions
    const cleanPath = componentPath.replace(/^\/|\.jsx$/g, '');

    if (namespace === 'Core') {
        const possiblePaths = [
            `../components/composite/${componentPath}.jsx`,
            `../domains/${componentPath}.jsx`,
            `../layouts/${componentPath}.jsx`,
            `../${cleanPath}.jsx`//la recherche directe au cas où le chemin complet est passé
        ];
        
        for (const path of possiblePaths) {
            if (globImports[path]) return globImports[path];
        }
    } 
    
    else {
        const path = `../../../../Features/${namespace}/Resources/js/components/${componentPath}.jsx`;
        if (globImports[path]) return globImports[path];
    }

    console.error(`[RESOLVER] Composant introuvable : ${name}`);
    return null;
};

/**
 * MOTEUR D'INJECTION (Islands Architecture)
 */
export async function mountIslands(container = document) {
    const islands = container.querySelectorAll('[data-react-component]');

    for (const el of islands) {
        if (el.dataset.mounted === "true") continue;

        const name = el.dataset.reactComponent;
        const props = JSON.parse(el.dataset.props || '{}');
        const importFn = resolveComponent(name);

        if (importFn) {
            const Component = lazy(importFn);
            const root = createRoot(el);
            
            root.render(
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback={<PageLoader />}>
                        <Component {...props} />
                    </Suspense>
                    <Toaster position="top-right" richColors />
                </QueryClientProvider>
            );
            el.dataset.mounted = "true";
        }
    }
}

/**
 * INITIALISATION AU CHARGEMENT DU DOM
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Chargement des traductions (via window.locale défini en Blade)
    await loadTranslations(window.App?.locale || 'en');
    
    // Montage des composants React
    await mountIslands(document);
});