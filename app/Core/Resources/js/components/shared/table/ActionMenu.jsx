import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import * as Icons from "lucide-react";
import { MoreHorizontal, Loader2, Settings } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@ui";
import { Button } from "@ui";

export function ActionMenu({ actions = [], row, onOpenAction, onSuccess }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!actions || actions.length === 0) return null;

    const handleActionClick = (action) => {
        if (action.confirm || action.method === 'DELETE') {
            setPendingAction(action);
            setConfirmOpen(true);
            return;
        }
        
        if (action.mode === 'modal' || action.mode === 'slideover') {
            onOpenAction({ ...action, id: row.id });
            return;
        }

        if (!action.method || action.method === 'GET') {
            const url = action.url.replace(/{(\w+)}/g, (_, key) => row[key] || '');
            window.location.href = url;
            return;
        }
    };

    const executeConfirmedAction = async () => {
        setLoading(true);
        const url = typeof pendingAction.url === 'function' ? pendingAction.url(row) : pendingAction.url;

        try {
            const response = await axios({ method: pendingAction.method || 'POST', url: url });
            toast.success(response.data.message || "Opération réussie");
            setConfirmOpen(false);
            if (onSuccess) onSuccess(); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Une erreur est survenue.");
        } finally {
            setLoading(false);
            setPendingAction(null);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    {actions.map((action, idx) => {
                        const Icon = Icons[action.icon] || Settings;
                        return (
                            <DropdownMenuItem key={idx} onClick={() => handleActionClick(action)} className={action.variant === 'danger' ? 'text-destructive' : ''}>
                                <Icon className="mr-2 h-4 w-4" /><span>{action.label}</span>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle><AlertDialogDescription>{pendingAction?.confirm}</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={(e) => { e.preventDefault(); executeConfirmedAction(); }} disabled={loading} className={pendingAction?.variant === 'danger' ? 'bg-destructive' : ''}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirmer"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}