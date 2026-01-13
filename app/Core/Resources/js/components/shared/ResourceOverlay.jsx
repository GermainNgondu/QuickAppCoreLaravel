import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AlertCircle } from "lucide-react";
import { DynamicForm } from '@composite';
import { DataView } from '@composite';
import { ResourceSkeleton } from './ResourceSkeleton';

export function ResourceOverlay({ resourceClass, type, id, onSuccess, onOpenAction, onDirtyStateChange }) {
    const { data: meta, isLoading, error } = useQuery({
        queryKey: ['resource-meta', resourceClass, type, id],
        queryFn: () => axios.get('/api/admin/resource-metadata', { 
            params: { class: resourceClass, type, id } 
        }).then(res => res.data),
        staleTime: 300000, 
    });

    if (isLoading) return <div className="px-4 space-y-3"><ResourceSkeleton type={type} /></div>;

    if (error || !meta) return (
        <div className="p-6 text-destructive flex gap-2 items-center bg-destructive/10 rounded-lg border border-destructive/20">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Impossible de charger le schéma de la ressource.</span>
        </div>
    );

    return type === 'form' ? (
        <div className="px-4 space-y-3">
            <DynamicForm 
                schema={meta.schema} 
                initialValues={meta.data} 
                submitUrl={meta.options.submitUrl}
                method={meta.options.method}
                onSuccess={onSuccess}
                onDirtyStateChange={onDirtyStateChange}
            />            
        </div>
    ) : (
        <div className="px-4 space-y-3">
            <DataView schema={meta.schema} data={meta.data} onOpenAction={onOpenAction} />
        </div>
    );
}