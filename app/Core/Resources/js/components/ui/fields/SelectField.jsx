import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField } from "@ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";
import { FieldWrapper } from "@shared";

export function SelectField({ name, label, options = [], placeholder, required, help }) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FieldWrapper label={label} help={help} required={required}>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FieldWrapper>
            )}
        />
    );
}