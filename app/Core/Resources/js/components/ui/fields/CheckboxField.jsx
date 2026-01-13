import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField } from "@ui/form";
import { Checkbox } from "@ui";
import { FieldWrapper } from "@shared";

export function CheckboxField({ name, label, help, required }) {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FieldWrapper label={label} help={help} required={required} layout="horizontal">
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FieldWrapper>
            )}
        />
    );
}