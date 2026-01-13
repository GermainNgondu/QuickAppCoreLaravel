import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@ui';
import { Users, ShieldCheck, Activity, Key } from 'lucide-react';

export default function UserDashboard({ user, stats }) {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Bienvenue, {user.name}</h1>
                <p className="text-slate-500">Voici un aperçu de l'état actuel de votre plateforme.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Utilisateurs" value={stats.total_users} icon={<Users />} color="text-blue-600" />
                <StatCard title="Rôles" value={stats.total_roles} icon={<ShieldCheck />} color="text-zinc-600" />
                <StatCard title="Sessions" value={stats.active_sessions} icon={<Activity />} color="text-emerald-600" />
                <StatCard title="Sécurité" value="Optimale" icon={<Key />} color="text-amber-600" />
            </div>

            <Card className="bg-white border-slate-200 shadow-sm">
                <CardHeader>
                    <CardTitle>Activités récentes</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Liste des activités ici */}
                    <p className="text-sm text-slate-400 italic">Aucune activité récente à afficher.</p>
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({ title, value, icon, color }) {
    return (
        <Card className="bg-white border-slate-100 shadow-sm overflow-hidden">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">{title}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-slate-50 ${color}`}>
                        {React.cloneElement(icon, { className: "w-6 h-6" })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}