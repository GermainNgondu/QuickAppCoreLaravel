import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button } from '@ui';
import { FolderInput, Loader2, Check } from 'lucide-react';
import { cn } from '@lib';

export function MoveCollectionModal({ isOpen, onClose, onConfirm, isPending }) {
    const [target, setTarget] = useState('library');
    const collections = [
        { id: 'library', label: 'Bibliothèque standard' },
        { id: 'avatars', label: 'Photos de profil' },
        { id: 'products', label: 'Images produits' },
        { id: 'logos', label: 'Logos & Identité' },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader><DialogTitle className="flex items-center gap-2"><FolderInput className="w-5 h-5 text-zinc-600" /> Déplacer les médias</DialogTitle></DialogHeader>
                <div className="py-4 space-y-2">
                    {collections.map(c => (
                        <button key={c.id} onClick={() => setTarget(c.id)} className={cn(
                            "w-full text-left px-4 py-3 rounded-xl border-2 flex items-center justify-between transition-all text-sm font-medium",
                            target === c.id ? "border-zinc-600 bg-zinc-50 text-zinc-700" : "border-slate-100 hover:border-slate-200"
                        )}>
                            {c.label}
                            {target === c.id && <Check className="w-4 h-4" />}
                        </button>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>Annuler</Button>
                    <Button onClick={() => onConfirm(target)} disabled={isPending} className="bg-zinc-600 text-white gap-2">
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />} Confirmer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}