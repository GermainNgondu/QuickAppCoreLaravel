import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@ui";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function ChartCard({ title, data, className }) {
    return (
        <Card className={className}>
            <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}