import React from 'react';
import { cn } from "@lib";

export function Grid({ columns = 2, gap = 4, children }) {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={cn("grid gap-4", gridCols[columns] || 'grid-cols-1', `gap-${gap}`)}>
            {children}
        </div>
    );
}