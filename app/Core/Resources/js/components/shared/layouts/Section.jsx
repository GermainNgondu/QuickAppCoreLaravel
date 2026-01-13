import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@ui";

export function Section({ title, description, aside, children }) {
    if (aside) {
        return (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3 py-10">
                <div>
                    <h2 className="text-base font-semibold leading-7">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
                <Card className="md:col-span-2">
                    <CardContent className="pt-6">{children}</CardContent>
                </Card>
            </div>
        );
    }

    return (
        <Card className="mb-6">
            {(title || description) && (
                <CardHeader>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            )}
            <CardContent>{children}</CardContent>
        </Card>
    );
}