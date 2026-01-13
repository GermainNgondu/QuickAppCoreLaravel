import React from 'react';
import { cn } from '@/lib/utils';

export function MediaSkeleton({ count = 12 }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div 
                    key={i} 
                    className="aspect-square w-full bg-slate-100 rounded-2xl animate-pulse relative overflow-hidden"
                >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-slate-200 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
}