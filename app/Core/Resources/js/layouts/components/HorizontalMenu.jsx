import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@ui";
import { cn, __ } from "@lib";
import * as Icons from "lucide-react";

export function HorizontalMenu({ items = {} }) {
    const currentUrl = window.location.href;
    const checkActive = (item) => {
        // Si l'item a explicitement un état active: true venant du backend
        if (item.active) return true;
        
        // Sinon, on compare l'URL (en ignorant les paramètres de requête si nécessaire)
        return currentUrl === item.url || window.location.pathname === new URL(item.url).pathname;
    };
 
    const menuItems = React.useMemo(() => {
        if (!items) return [];
        if (Array.isArray(items)) return items;

        // On aplatit les groupes (ex: "Navigation", "System") pour avoir 
        // tous les items de premier niveau côte à côte.
        return Object.entries(items).flatMap(([groupName, groupItems]) => {
            return Array.isArray(groupItems) ? groupItems : [];
        });
    }, [items]);

    if (menuItems.length === 0) return null;

    return (
        <NavigationMenu className="max-w-full">
            <NavigationMenuList className="flex-row gap-1">
                {menuItems.map((item, index) => {
                    const Icon = Icons[item.icon] || Icons.Circle;
                    const isActive = checkActive(item);
                    const hasSubMenu = item.items && Array.isArray(item.items) && item.items.length > 0;

                    // CAS 1 : L'item a un sous-menu (Rendu en Dropdown)
                    if (hasSubMenu) {
                        return (
                            <NavigationMenuItem key={item.id || `group-${index}`}>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-accent h-9 px-3">
                                    <Icon className="mr-2 h-4 w-4" />
                                    <span className="text-sm font-medium">{__(item.label)}</span>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[200px] gap-1 p-2 bg-popover border rounded-md shadow-md">
                                        {item.items.map((subItem) => {
                                            const SubIcon = Icons[subItem.icon] || Icons.Circle;
                                            return (
                                                <li key={subItem.id}>
                                                    <NavigationMenuLink asChild>
                                                        <a
                                                            href={subItem.url}
                                                            className="flex items-center gap-2 select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                                        >
                                                            <SubIcon className="h-4 w-4 text-muted-foreground" />
                                                            <div className="text-sm font-medium leading-none">
                                                                {__(subItem.label)}
                                                            </div>
                                                        </a>
                                                    </NavigationMenuLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        );
                    }

                    // CAS 2 : L'item est un lien simple
                    return (
                        <NavigationMenuItem key={item.id || `item-${index}`}>
                            <NavigationMenuLink 
                                href={item.url} 
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "bg-transparent py-2 transition-all relative flex items-center justify-between",
                                    isActive && "bg-accent text-accent-foreground font-semibold"
                                )}
                            >
                                <Icon className="mr-1 h-4 w-4" />
                                <span className="text-sm font-medium whitespace-nowrap">{__(item.label)}</span>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}