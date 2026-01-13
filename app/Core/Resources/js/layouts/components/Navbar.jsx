import React from 'react';
import { SidebarTrigger } from "@ui";
import { UserMenu } from "./UserMenu";
import { useConfig } from "@/providers/config-provider"; //
import { __ } from '@lib';

export function Navbar({ title,user, children, showMenuToggle = true, layoutType = 'sidebar'}) {
    // Correction du bug : On extrait settings avec une valeur par défaut vide
    const { settings } = useConfig() || {}; 

    // Sécurisation des accès aux clés (évite le undefined)
    const appName = settings?.app_name || 'QuickApp';
    const appFavicon = settings?.app_favicon || null;

    const isSidebarMode = layoutType === 'sidebar';

    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6">
            <div className="flex items-center gap-4 flex-1">
                {/* Toujours afficher le trigger en mode sidebar ou mobile */}
                {showMenuToggle && <SidebarTrigger className="-ml-2" />}

                {/* LOGO & BRAND : Masqués si on est en mode Sidebar */}
                {!isSidebarMode && (
                    <div className="flex items-center gap-3 shrink-0">
                        <a href="/admin/dashboard" className="flex items-center gap-2">
                            {appFavicon ? (
                                <img src={appFavicon} alt={appName} className="h-8 w-8 object-contain" />
                            ) : (
                                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                                    {appName.substring(0, 2).toUpperCase()}
                                </div>
                            )}
                            <span className="font-bold text-lg tracking-tight hidden sm:block">
                                {appName}
                            </span>
                        </a>
                    </div>
                )}

                {/* TITRE DE LA PAGE : Toujours visible */}
                <h1 className={isSidebarMode ? "text-lg font-semibold ml-2" : "text-lg font-semibold ml-4 border-l pl-4 hidden lg:block"}>
                    {title}
                </h1>

                {/* MENU HORIZONTAL : Uniquement si pas en sidebar */}
                {!isSidebarMode && (
                    <div className="hidden lg:flex items-center flex-1 ml-4">
                        {children}
                    </div>
                )}
            </div>

            {/* BLOC DROITE : Masqué en mode Sidebar selon votre demande */}
            {!isSidebarMode && (
                <div className="flex items-center gap-4 shrink-0">
                    <UserMenu user={user} />
                </div>
            )}
        </header>
    );
}