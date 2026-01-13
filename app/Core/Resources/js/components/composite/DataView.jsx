import React from 'react';
import { Badge } from "@ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@ui";
import { CheckCircle2, XCircle, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { ActionMenu } from "@shared/table/ActionMenu";

export function DataView({ schema, data, onOpenAction, title }) {
    const { columns = 1, schema: entries = [] } = schema;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copié dans le presse-papier");
    };

    return (
        <div className="space-y-1">

            {/* Header avec Actions rapides (ex: Modifier, Supprimer) */}
            <div className="flex justify-between items-start pb-4">
                <div>
                    {title ? <h3 className="text-lg font-semibold text-foreground">{title}</h3> : null}
                </div>

                <ActionMenu actions={schema.actions} row={data} onOpenAction={onOpenAction} />
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-8 p-4`}>
                {entries.map((entry) => (
                    <div key={entry.key} className={`${entry.span ? `md:col-span-${entry.span}` : ''} space-y-2`}>
                        <dt className="text-xs font-bold uppercase text-muted-foreground/70 tracking-tight">
                            {entry.label}
                        </dt>
                        <dd className="flex items-center gap-2">
                            <div className="flex-1 font-medium text-foreground">
                                {renderValue(entry, data)}
                            </div>
                            {entry.copyable && data[entry.key] && (
                                <button 
                                    onClick={() => copyToClipboard(data[entry.key])}
                                    className="text-muted-foreground hover:text-primary p-1 transition-colors"
                                >
                                    <Copy className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </dd>
                    </div>
                ))}
            </div>
        </div>

    );
}

function renderValue(entry, row) {
    const value = row[entry.key];
    if (value === null || value === undefined) return <span className="text-muted-foreground/50">---</span>;

    switch (entry.type) {
        case 'currency':
            return new Intl.NumberFormat(entry.locale, { style: 'currency', currency: entry.currency }).format(value);

        case 'boolean':
            return value ? 
                <div className="flex items-center text-green-600 gap-1.5 text-sm"><CheckCircle2 className="h-4 w-4" /> Oui</div> : 
                <div className="flex items-center text-destructive gap-1.5 text-sm"><XCircle className="h-4 w-4" /> Non</div>;

        case 'user':
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border">
                        <AvatarImage src={row[entry.avatarKey]} />
                        <AvatarFallback>{value.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold leading-none">{value}</span>
                        {entry.subLabelKey && <span className="text-xs text-muted-foreground">{row[entry.subLabelKey]}</span>}
                    </div>
                </div>
            );

        case 'link':
            const url = entry.url || value;
            return (
                <a href={url} target={entry.external ? "_blank" : "_self"} className="text-primary hover:underline items-center gap-1 inline-flex">
                    {value} {entry.external && <ExternalLink className="h-3 w-3" />}
                </a>
            );

        case 'badge':
            return <Badge variant={entry.colorMap?.[value] || 'outline'} className="capitalize">{value}</Badge>;

        case 'image':
            return <img src={value} className={`h-16 w-16 object-cover border ${entry.rounded ? 'rounded-lg' : ''}`} alt="" />;

        default:
            return <span className="whitespace-pre-wrap">{value}</span>;
    }
}