import React, { createContext, useContext, useMemo } from 'react';

// Création du contexte pour les réglages
const ConfigContext = createContext(undefined);

/**
 * Le ConfigProvider reçoit les réglages (settings) de Laravel 
 * et les rend disponibles dans toute l'application via le hook useConfig.
 */
export const ConfigProvider = ({ children, settings = {} }) => {

    // On mémorise la valeur pour éviter des re-rendus inutiles
    const value = useMemo(() => ({
        settings, // Contient vos clés 'general', 'app_name', 'app_logo_url', etc.
    }), [settings]);

    return (
        <ConfigContext.Provider value={value}>
            {children}
        </ConfigContext.Provider>
    );
};

/**
 * Hook personnalisé pour accéder facilement aux réglages
 */
export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        // Cette erreur aide au débogage si vous utilisez useConfig hors du Provider
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};