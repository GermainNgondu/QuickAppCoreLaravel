import React, { useMemo } from 'react';
import { useFormContext, useWatch } from "react-hook-form";
import { FormField } from "@ui/form";
import { Input, PasswordInput, Progress } from "@ui";
import { FieldWrapper } from "@shared";

export function TextInputField({ 
    name, label, help, required, 
    inputType = "text", 
    placeholder, 
    onChange: externalOnChange,
    value: externalValue,
    ...props 
}) {
    const { control } = useFormContext();
    
    // Surveillance de la valeur pour la barre de force
    const currentPathValue = useWatch({ control, name }) || "";

    // Calcul de la force (0-100)
    const strength = useMemo(() => {
        if (inputType !== 'password' || !currentPathValue) return 0;
        let score = 0;
        if (currentPathValue.length >= 8) score += 25;
        if (/[A-Z]/.test(currentPathValue) && /[a-z]/.test(currentPathValue)) score += 25;
        if (/[0-9]/.test(currentPathValue)) score += 25;
        if (/[^A-Za-z0-9]/.test(currentPathValue)) score += 25;
        return score;
    }, [currentPathValue, inputType]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FieldWrapper label={label} help={help} required={required}>
                    <div className="space-y-3">
                        {inputType === 'password' ? (
                            <PasswordInput 
                                {...field} // Contient value, onChange, onBlur de Hook Form
                                {...props}
                                placeholder={placeholder || "••••••••"}
                                onChange={(e) => {
                                    field.onChange(e); // Met à jour Hook Form
                                    externalOnChange?.(e.target.value); // Met à jour votre état global
                                }}
                            />
                        ) : (
                            <Input 
                                {...field} 
                                {...props}
                                type={inputType} 
                                placeholder={placeholder} 
                                onChange={(e) => {
                                    field.onChange(e);
                                    externalOnChange?.(e.target.value);
                                }}
                            />
                        )}

                        {/* Barre de force du mot de passe */}
                        {inputType === 'password' && props?.enabledStrength && currentPathValue && (
                            <div className="space-y-1.5 animate-in fade-in">
                                <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                                    <span>Force du mot de passe</span>
                                    <span>{strength}%</span>
                                </div>
                                <Progress value={strength} className="h-1" />
                            </div>
                        )}
                    </div>
                </FieldWrapper>
            )}
        />
    );
}