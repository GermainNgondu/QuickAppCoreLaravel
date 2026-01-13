import React from 'react';
import { ThemeProvider, ConfigProvider, UpdateProvider } from "@providers";
import { Toaster } from "sonner";
import { SidebarLayout } from "./SidebarLayout";
import { TopNavLayout } from "./TopNavLayout";
import { SimpleLayout } from "./SimpleLayout";
import { GlobalCommandPalette } from "@shared";
import { useAdminConfig } from "@/hooks";
import { Loader2 } from "lucide-react"

const LAYOUT_COMPONENTS = {
    sidebar: SidebarLayout,
    'top-nav': TopNavLayout,
    simple: SimpleLayout,
};

export function AdminLayout({ children, title: pageTitle }) {

    // Chargement automatique des données globales (Bootstrap) via TanStack Query
    const { data: config, isLoading, error } = useAdminConfig();

    if (isLoading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 text-zinc-600 animate-spin mb-4" />
                <p className="text-zinc-500 font-medium animate-pulse">Initialisation de votre espace...</p>
            </div>
        );
    }

    if (error) return <div className="p-10 text-red-500 text-center">Erreur système : Impossible de charger la configuration.</div>;

    // Détermination de la mise en page selon les préférences de l'utilisateur
    const layoutType = config.user?.metadata?.layout_type || 'sidebar';
    const SelectedLayout = LAYOUT_COMPONENTS[layoutType] || SidebarLayout;

    // Fusion des données : on passe les données du bootstrap + les enfants (la page actuelle)
    const layoutProps = {
        ...config,
        title: pageTitle || config.settings?.app_name,
        children
    };
  
    return (
        <ThemeProvider>
            <ConfigProvider settings={config.settings || {}}>
                <UpdateProvider>
                    <SelectedLayout {...layoutProps} />
                    <GlobalCommandPalette />
                    <Toaster position="top-right" richColors />
                </UpdateProvider>
            </ConfigProvider>
        </ThemeProvider>
    );
}