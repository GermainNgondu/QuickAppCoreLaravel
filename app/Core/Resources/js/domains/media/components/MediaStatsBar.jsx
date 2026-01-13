import React from 'react';
import { HardDrive, ImageIcon, Film, Database } from 'lucide-react';
import { cn } from '@lib';

export function MediaStatsBar({ stats }) {
    const formatSize = (bytes) => {
        if (!bytes) return '0 B';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
    };

    const cards = [
        { label: 'Total Fichiers', value: stats?.total_count || 0, icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Espace Utilisé', value: formatSize(stats?.total_size), icon: HardDrive, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Images', value: stats?.image_count || 0, icon: ImageIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Vidéos', value: stats?.video_count || 0, icon: Film, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cards.map((card, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
                    <div className={cn("p-3 rounded-xl", card.bg)}>
                        <card.icon className={cn("w-6 h-6", card.color)} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</p>
                        <p className="text-xl font-black text-slate-800">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}