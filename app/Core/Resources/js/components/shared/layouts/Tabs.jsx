import React from 'react';
import { Tabs as ShadcnTabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";
import { Badge } from "@ui";
import { SchemaRenderer } from "@shared";

export function Tabs({ tabs, value, errors, onChange, customComponents, ...extraProps }) {
    if (!tabs || tabs.length === 0) return null;

    const getErrorCount = (tabSchema) => {
        const fields = tabSchema.map(i => i.name).filter(Boolean);
        return fields.filter(name => errors && errors[name]).length;
    };

    return (
        <ShadcnTabs defaultValue={tabs[0].key} className="w-full">
            <TabsList className="mb-4 bg-muted/50 p-1">
                {tabs.map((tab) => {
                    const errorCount = getErrorCount(tab.schema);
                    return (
                        <TabsTrigger key={tab.key} value={tab.key} className="gap-2">
                            {tab.label}
                            {errorCount > 0 && <Badge variant="destructive" className="h-4 p-1 text-[9px]">{errorCount}</Badge>}
                        </TabsTrigger>
                    );
                })}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.key} value={tab.key} className="outline-none">
                    <SchemaRenderer 
                        schema={tab.schema} 
                        value={value}
                        errors={errors}
                        onChange={onChange}
                        customComponents={customComponents}
                        {...extraProps}
                    />
                </TabsContent>
            ))}
        </ShadcnTabs>
    );
}