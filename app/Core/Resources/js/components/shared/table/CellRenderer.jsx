import React from 'react';
import { Badge } from "@ui";
import { Progress } from "@ui";
import { Check, X, FileText } from "lucide-react";
import { cn } from "@lib";

export function CellRenderer({ column, row }) {
    const value = row[column.key];

    switch (column.type) {
        case 'image':
            const url = typeof value === 'object' ? value?.url : value;
            return (
                <div className="flex items-center justify-center h-10 w-10 relative">
                    {url ? (
                        <img 
                            src={url} 
                            className={cn("h-8 w-8 object-cover border", column.rounded ? "rounded-full" : "rounded-md")} 
                        />
                    ) : (
                        <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                    )}
                </div>
            );

        case 'badge':
            const color = column.colorMap?.[value] || 'secondary';
            return (
                <Badge variant={color} className="capitalize">
                    {value}
                </Badge>
            );

        case 'boolean':
            return value ? (
                <Check className="h-4 w-4 text-green-600" />
            ) : (
                <X className="h-4 w-4 text-destructive" />
            );

        case 'progress':
            return (
                <div className="w-full max-w-[100px] flex items-center gap-2">
                    <Progress value={value} className="h-2" />
                    <span className="text-[10px] text-muted-foreground">{value}%</span>
                </div>
            );

        case 'date':
            return value ? new Date(value).toLocaleDateString() : '-';

        default:
            return <span className="text-sm">{value}</span>;
    }
}