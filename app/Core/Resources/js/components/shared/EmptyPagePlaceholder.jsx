import React from 'react';
import { LayoutPanelLeft, AlertCircle } from 'lucide-react';
import { Button } from '@ui';

export function EmptyPagePlaceholder() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-12 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50">
                <LayoutPanelLeft className="h-10 w-10 text-muted-foreground/50" />
            </div>
            
            <h2 className="mt-6 text-xl font-semibold">Aucun contenu à afficher</h2>
            
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Cette page semble vide. Assurez-vous d'avoir défini un <strong>schema</strong> 
                ou un <strong>component</strong> dans votre Action PHP via <code>UIPage</code>.
            </p>

            <div className="mt-8 flex gap-4">
                <Button 
                    variant="outline" 
                    onClick={() => window.location.reload()}
                >
                    Actualiser la page
                </Button>
                <Button 
                    variant="ghost"
                    className="text-xs text-muted-foreground"
                    onClick={() => console.log("Astuce: Vérifiez la méthode render() de votre Action.")}
                >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Besoin d'aide ?
                </Button>
            </div>
        </div>
    );
}