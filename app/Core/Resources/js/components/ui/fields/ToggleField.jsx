import { Switch } from "@ui/switch";
import { FieldWrapper } from "@shared";
import { useFormContext } from "react-hook-form";
import { FormField } from "@ui/form";

export function ToggleField({ name, label, help, required }) {
    const { control } = useFormContext();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FieldWrapper label={label} help={help} required={required} layout="horizontal">
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FieldWrapper>
            )}
        />
    );
}