import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField } from "@ui/form";
import { Slider } from "@ui/slider";
import { FieldWrapper } from "@shared";

export function SliderField({ name, label, min = 0, max = 100, step = 1 }) {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FieldWrapper label={label}>
                    <div className="pt-4">
                        <Slider
                            min={min}
                            max={max}
                            step={step}
                            value={[field.value || min]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                        />
                    </div>
                </FieldWrapper>
            )}
        />
    );
}