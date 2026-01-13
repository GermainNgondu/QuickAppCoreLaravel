import React from 'react';
import { 
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, 
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui";
import { User, Settings, LogOut, Monitor, Moon, Sun } from "lucide-react";
import { __ } from '@lib';
import { useTheme } from "@/providers/theme-provider";

export function UserMenu({ user }) {
    const { setTheme } = useTheme();

    const handleLogout = () => {
        // Redirection vers votre route de déconnexion existante
        window.location.href = '/logout';
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full cursor-pointer">
                    <Avatar className="h-10 w-10 border">
                        {/* Utilise l'avatar_url du DTO UserData */}
                        <AvatarImage src={user?.avatar_url} alt={user?.name} />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none capitalize">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => window.location.href = '/admin/profile'} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>{__('Mon Profil')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = '/admin/settings'} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{__('Paramètres')}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground uppercase px-2 py-1.5">
                        {__('Thème')}
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                        <Sun className="mr-2 h-4 w-4" />
                        <span>{__('Clair')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                        <Moon className="mr-2 h-4 w-4" />
                        <span>{__('Sombre')}</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{__('Déconnexion')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}