import React from 'react';
import { SchemaRenderer } from "@shared";

export function Split({ panes }) {
    return (
        <div className="flex flex-col md:flex-row gap-6">
            {panes.map((pane, index) => (
                <div key={index} className="flex-1">
                    <SchemaRenderer schema={pane.schema} />
                </div>
            ))}
        </div>
    );
}