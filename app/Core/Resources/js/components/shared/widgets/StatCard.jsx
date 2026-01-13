import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@ui";
import * as Icons from "lucide-react";
import { __ } from '@lib'; 

export function StatCard({ label, title, value, trend, icon }) {
    const Icon = Icons[icon] || Icons.Activity;
console.log(value)
    // Affiche soit le label, soit le title (priorité au label)
    const displayTitle = label || title;

    /**
     * Helper pour éviter l'erreur #31
     * Si la valeur est un objet (traduction), on extrait la chaîne.
     */
    const renderContent = (val) => {
        if (!val) return "-";
        if (typeof val === 'object') {
            // Tente de récupérer la traduction via votre helper ou une clé 'label'
            return val.label || val.title || JSON.stringify(val);
        }
        return val;
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                    {/* On utilise votre fonction de traduction si c'est une clé */}
                    {typeof displayTitle === 'string' ? __(displayTitle) : renderContent(displayTitle)}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {renderContent(value)}
                </div>
                {trend && (
                    <p className={`text-xs mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend > 0 ? '+' : ''}{trend}% vs mois dernier
                    </p>
                )}
            </CardContent>
        </Card>
    );
}