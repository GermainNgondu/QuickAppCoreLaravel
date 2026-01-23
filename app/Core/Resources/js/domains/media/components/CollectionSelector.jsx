import React, { useState } from 'react';
import { useMediaCollections } from '@hooks';
import { Settings2, Loader2 } from 'lucide-react';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger, 
    Button 
} from '@ui';
import { ManageCollectionsModal } from './ManageCollectionsModal';

/**
 * Sélecteur de collection dynamique avec interface de gestion intégrée.
 */
export function CollectionSelector({ value, onChange, className }) {
    const { collections, isLoading, isError } = useMediaCollections();
    const [isOpen, setIsOpen] = useState(false);

    // En cas d'erreur de chargement, on reste discret ou on affiche un message
    if (isError) {
        console.error("[QuickAppCore] Erreur lors du chargement des collections média.");
    }

    return (
        <div className="flex items-center gap-2">
            {/* Menu déroulant dynamique */}
            <div className="relative flex-1">
                <select 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isLoading}
                    className={className}
                >
                    <option value="">Toutes les collections</option>
                    {collections.map((col) => (
                        <option key={col.id} value={col.id}>
                            {col.name}
                        </option>
                    ))}
                </select>
                
                {/* Indicateur de chargement visuel */}
                {isLoading && (
                    <div className="absolute right-8 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                    </div>
                )}
            </div>

            {/* Bouton de gestion (Update/Delete/Create) */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        title="Gérer les collections"
                        className="rounded-xl bg-slate-50 border-none hover:bg-slate-100 h-10 w-10 shrink-0 transition-colors"
                    >
                        <Settings2 className="w-4 h-4 text-slate-600" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Gestion des collections</DialogTitle>
                    </DialogHeader>
                    <ManageCollectionsModal />
                </DialogContent>
            </Dialog>
        </div>
    );
}