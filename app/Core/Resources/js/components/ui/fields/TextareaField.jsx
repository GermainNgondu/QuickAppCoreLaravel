import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField } from "@ui/form";
import { Textarea } from "@ui/textarea";
import { FieldWrapper } from "@shared";

export function TextareaField({ name, label, help, required, placeholder }) {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FieldWrapper label={label} help={help} required={required}>
                    <Textarea {...field} placeholder={placeholder} value={field.value ?? ""} />
                </FieldWrapper>
            )}
        />
    );
}