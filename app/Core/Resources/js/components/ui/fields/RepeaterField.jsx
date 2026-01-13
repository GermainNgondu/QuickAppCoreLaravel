import React from 'react';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Card } from "@ui";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { SchemaRenderer } from "@shared";

export function RepeaterField({ name, label, schema, addLabel = "Ajouter" }) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{label}</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => append({})}>
                    <Plus className="mr-2 h-4 w-4" /> {addLabel}
                </Button>
            </div>

            {fields.map((field, index) => (
                <Card key={field.id} className="p-4 relative group">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    </div>
                    
                    <div className="pl-6 pr-10">
                        {/* On rend le schéma récursivement pour chaque ligne */}
                        {/* Important : On préfixe le nom des champs par l'index du repeater */}
                        <SchemaRenderer 
                            schema={schema.map(s => ({
                                ...s,
                                name: `${name}.${index}.${s.name}`
                            }))} 
                        />
                    </div>

                    <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-2 text-destructive"
                        onClick={() => remove(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </Card>
            ))}
        </div>
    );
}