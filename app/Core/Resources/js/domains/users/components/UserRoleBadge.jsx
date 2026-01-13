import React from 'react';
import { cn } from '@/lib/utils';

export function UserRoleBadge({ role }) {
    const config = {
        'super-admin': 'bg-rose-50 text-rose-700 border-rose-100',
        'admin': 'bg-zinc-50 text-zinc-700 border-zinc-100',
        'user': 'bg-slate-50 text-slate-700 border-slate-100',
    };

    return (
        <span className={cn(
            "px-2 py-1 rounded-md text-xs font-bold border uppercase tracking-wider",
            config[role] || config['user']
        )}>
            {role}
        </span>
    );
}