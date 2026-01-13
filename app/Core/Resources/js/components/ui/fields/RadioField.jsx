import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField} from "@ui/form";
import { Label } from "@ui/label";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { FieldWrapper } from "@shared";

export function RadioField({ name, label, options = [], help, required }) {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FieldWrapper label={label} help={help} required={required}>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2 pt-2">
                        {options.map((opt) => (
                            <div key={opt.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
                                <Label htmlFor={`${name}-${opt.value}`} className="font-normal cursor-pointer">{opt.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </FieldWrapper>
            )}
        />
    );
}