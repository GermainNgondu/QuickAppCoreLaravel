import React from 'react';
import { FormProvider } from "react-hook-form";
import { useDynamicForm } from "@hooks";
import { SchemaRenderer } from "@shared";
import { Button } from "@ui";
import { Loader2, Save } from "lucide-react";

export function DynamicForm(props) {
    const { methods, onSubmit, isSubmitting } = useDynamicForm(props);

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                    <SchemaRenderer 
                        schema={props.schema} 
                        onOpenAction={props.onOpenAction} 
                    />                    
                </div>
                
                <div className="p-6 border-t bg-background/95 backdrop-blur">
                    <div className="flex justify-end gap-3">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" />}
                            {props.submitLabel || "Enregistrer les modifications"}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}