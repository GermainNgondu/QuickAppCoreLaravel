import './bootstrap';
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentErrorBoundary } from '@shared';
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

const resolutionCache = new Map();

/**
 * RÉSOLVEUR DE CHEMINS (The Brain)
 */
const resolveComponent = (name) => {
    if (!name) return null;

    if (resolutionCache.has(name)) return resolutionCache.get(name);

    const [namespace, componentPath] = name.split('::');
    const cleanPath = componentPath.replace(/^\/|\.jsx$/g, '');
    let resolved = null;

    if (namespace === 'Core') {
        const possiblePaths = [
            `../components/composite/${componentPath}.jsx`,
            `../domains/${componentPath}.jsx`,
            `../layouts/${componentPath}.jsx`,
            `../${cleanPath}.jsx`
        ];
        
        const match = possiblePaths.find(p => globImports[p]);
        resolved = match ? globImports[match] : null;
    } 
    
    else {
        const path = `../../../../Features/${namespace}/Resources/js/components/${componentPath}.jsx`;
        resolved = globImports[path] || null;
    }

    if (resolved) {
        resolutionCache.set(name, resolved);
    } else {
        console.error(`[RESOLVER] Composant introuvable : ${name}`);
    }

    return resolved;
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
                    <ComponentErrorBoundary componentName={name}>
                        <Suspense fallback={<PageLoader />}>
                            <Component {...props} />
                        </Suspense>
                    </ComponentErrorBoundary>
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