import React from 'react';
import { Button } from "@ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ meta }) {
    if (!meta || meta.last_page <= 1) return null;

    const { current_page, last_page, next_page_url, prev_page_url, from, to, total } = meta;

    const navigate = (url) => {
        if (url) window.location.href = url;
    };

    return (
        <div className="flex items-center justify-between px-2 py-4 border-t">
            <div className="text-sm text-muted-foreground">
                Affichage de <span className="font-medium">{from}</span> à <span className="font-medium">{to}</span> sur <span className="font-medium">{total}</span> résultats
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(prev_page_url)}
                    disabled={!prev_page_url}
                >
                    <ChevronLeft className="h-4 w-4" /> Précédent
                </Button>
                <div className="text-sm font-medium">
                    Page {current_page} sur {last_page}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(next_page_url)}
                    disabled={!next_page_url}
                >
                    Suivant <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}