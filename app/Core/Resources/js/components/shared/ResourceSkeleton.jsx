import React from 'react';
import { Skeleton } from "@ui";

export function ResourceSkeleton({ type = 'form' }) {
    if (type === 'view') {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="flex justify-between items-start border-b pb-4">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="space-y-2 border-b border-muted/50 pb-2">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-5 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-pulse">
            <div className="grid gap-5">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                ))}
            </div>
            <div className="flex justify-end pt-4 border-t mt-6">
                <Skeleton className="h-10 w-full sm:w-32" />
            </div>
        </div>
    );
}