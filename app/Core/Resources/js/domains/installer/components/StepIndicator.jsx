import React from 'react';
import { cn } from '@lib';

export function StepIndicator({ currentStep, steps }) {
    return (
        <div className="flex justify-between items-center px-2">
            {steps.map((label, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 relative flex-1">
                    {/* Ligne de liaison */}
                    {idx > 0 && (
                        <div className={cn(
                            "absolute top-4 -left-1/2 w-full h-[2px] -z-10",
                            idx <= currentStep ? "bg-primary" : "bg-muted"
                        )} />
                    )}
                    
                    {/* Cercle */}
                    <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
                        idx === currentStep ? "bg-primary text-white border-primary" : 
                        idx < currentStep ? "bg-primary/20 border-primary text-primary" : "bg-background border-muted text-muted-foreground"
                    )}>
                        {idx + 1}
                    </div>
                    <span className={cn(
                        "text-[10px] uppercase font-bold tracking-wider",
                        idx === currentStep ? "text-primary" : "text-muted-foreground"
                    )}>
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}