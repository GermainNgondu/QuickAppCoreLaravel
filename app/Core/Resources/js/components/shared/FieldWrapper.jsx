import React from 'react';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@ui/form";
import { cn } from "@lib";

export function FieldWrapper({ label, help, required, children, layout = "vertical", className }) {
    const isHorizontal = layout === "horizontal";

    return (
        <FormItem className={cn(
            "w-full",
            isHorizontal ? "flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm space-y-0" : "space-y-1",
            className
        )}>
            {/* Si horizontal, le label vient souvent avec la description à gauche */}
            {isHorizontal ? (
                <div className="space-y-0.5">
                    <FormLabel className="text-base">
                        {label} {required && <span className="text-destructive">*</span>}
                    </FormLabel>
                    {help && <FormDescription>{help}</FormDescription>}
                </div>
            ) : (
                label && (
                    <FormLabel className="text-sm font-medium">
                        {label} {required && <span className="text-destructive">*</span>}
                    </FormLabel>
                )
            )}

            <FormControl>
                {children}
            </FormControl>

            {/* Pour le mode vertical, on affiche l'aide et l'erreur en dessous */}
            {!isHorizontal && (
                <>
                    {help && <FormDescription>{help}</FormDescription>}
                    <FormMessage />
                </>
            )}
            
            {/* Pour le mode horizontal, on met quand même le message d'erreur */}
            {isHorizontal && <FormMessage />}
        </FormItem>
    );
}