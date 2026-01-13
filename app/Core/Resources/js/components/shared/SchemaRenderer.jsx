import React, { Suspense } from 'react';
import { COMPONENT_MAP } from '@core/component-registry';
import { Skeleton } from "@ui/skeleton";

export function SchemaRenderer({ 
    schema, 
    value = {},      
    errors = {},     
    onChange,        
    customComponents = {}, 
    ...extraProps 
}) {
    if (!schema || !Array.isArray(schema)) return null;

    return (
        <>
            {schema.map((item, index) => {
                if (item.type === 'hidden') return null;

                const Component = customComponents[item.component] || 
                                  customComponents[item.type] || 
                                  COMPONENT_MAP[item.type];

                if (!Component) {
                    console.warn(`Composant non trouvé pour le type : ${item.type}`);
                    return null;
                }

                const fieldProps = {
                    ...item,
                    ...extraProps,
                    value,
                    errors,
                    onChange,
                    customComponents,
                };

                return (
                    <Suspense key={item.key || index} fallback={<Skeleton className="h-10 w-full rounded-md" />}>
                        <Component {...fieldProps}>
                            {item.schema && (
                                <SchemaRenderer 
                                    schema={item.schema} 
                                    value={value}
                                    errors={errors}
                                    onChange={onChange}
                                    customComponents={customComponents}
                                    {...extraProps}
                                />
                            )}
                        </Component>
                    </Suspense>
                );
            })}
        </>
    );
}