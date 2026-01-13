import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@ui';
import { Users, TrendingUp, Activity, LayoutDashboard } from 'lucide-react';

export default function Dashboard({ stats, recent_users }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Vue d'ensemble</h1>
            </div>

            {/* Grille de stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard 
                    title="Utilisateurs Totaux" 
                    value={stats.users_count} 
                    icon={<Users className="w-4 h-4" />} 
                    description={`${stats.new_users_today} nouveaux aujourd'hui`}
                />
                <StatCard 
                    title="Activité" 
                    value="98%" 
                    icon={<Activity className="w-4 h-4" />} 
                    trend="+2.1%"
                />
                <StatCard 
                    title="Statut Système" 
                    value="En ligne" 
                    icon={<TrendingUp className="w-4 h-4" />} 
                    color="text-emerald-600"
                />
            </div>

            {/* Table des derniers inscrits */}
            <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                        Utilisateurs récents
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-slate-100">
                        {recent_users.map(user => (
                            <div key={user.id} className="py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="text-xs text-slate-500">{user.email}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400">{user.created_at}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({ title, value, icon, description, trend, color = "text-indigo-600" }) {
    return (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-slate-50 ${color}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">{value}</span>
                        {trend && <span className="text-[10px] font-bold text-emerald-500">{trend}</span>}
                    </div>
                    {description && <p className="text-[10px] text-slate-400 mt-1 font-medium">{description}</p>}
                </div>
            </CardContent>
        </Card>
    );
}