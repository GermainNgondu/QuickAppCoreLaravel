import React from 'react';
import { Card, CardContent, CardFooter } from "@ui";
import { Checkbox } from "@ui";
import { ActionMenu } from "./ActionMenu";
import { cn } from "@lib";

export function GridView({ rows = [], mapping, actions, selectedIds = [], onSelectRow, onOpenAction }) {
    // Sécurité : Si rows est vide
    if (!rows.length) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rows.map((row) => {
                // On récupère les données selon le mapping défini en PHP
                const image = row[mapping?.image];
                const title = row[mapping?.title] || 'N/A';
                const subtitle = row[mapping?.subtitle];
                
                // LA CORRECTION : Utilisation sécurisée de .includes()
                const isSelected = Array.isArray(selectedIds) && selectedIds.includes(row.id);

                return (
                    <Card key={row.id} className={cn(
                        "relative group transition-all hover:shadow-md border-2",
                        isSelected ? "border-primary bg-primary/5" : "border-transparent"
                    )}>
                        {/* Checkbox de sélection (Absente sur votre image, utile pour le Bulk) */}
                        <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Checkbox 
                                checked={isSelected} 
                                onCheckedChange={() => onSelectRow(row.id)} 
                            />
                        </div>

                        <CardContent className="p-0 aspect-square overflow-hidden bg-muted flex items-center justify-center">
                            {image ? (
                                <img 
                                    src={typeof image === 'object' ? image.url : image} 
                                    className="h-full w-full object-cover" 
                                    alt={title}
                                />
                            ) : (
                                <span className="text-muted-foreground text-xs uppercase font-bold">
                                    {title.substring(0, 2)}
                                </span>
                            )}
                        </CardContent>

                        <CardFooter className="p-3 flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{title}</p>
                                {subtitle && (
                                    <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
                                )}
                            </div>
                            
                            {/* Menu d'actions réutilisé */}
                            <ActionMenu actions={actions} row={row} onOpenAction={onOpenAction}/>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}