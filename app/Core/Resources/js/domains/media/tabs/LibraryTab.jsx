import React, { useState, useEffect } from 'react';
import { useMedia } from '@hooks';
import { MediaPreview } from '../components/MediaPreview';
import { MediaSkeleton } from '../components/MediaSkeleton';
import { MoveCollectionModal } from '../components/MoveCollectionModal';
import { cn } from '@lib';
import { Check, Trash2, RotateCcw, FolderInput, Loader2, PlusCircle, AlertCircle } from 'lucide-react';
import { Button } from '@ui';

export function LibraryTab({ onSingleSelect, selectedId, filters, multiSelect = true, isTrashMode = false }) {
    const { libraryQuery, bulkDeleteMutation, restoreMutation, moveCollectionMutation } = useMedia(filters);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);


    if (libraryQuery.isLoading) {
        return <MediaSkeleton count={18} />;
    }

    if (libraryQuery.isError) {
        return (
            <div className="py-20 text-center border-2 border-dashed rounded-3xl border-red-100 bg-red-50 text-red-600">
                <p className="font-bold">Une erreur est survenue lors du chargement.</p>
            </div>
        );
    }

    const allMedia = libraryQuery.data?.pages.flatMap(page => page.data) || [];

    const toggleSelection = (id) => {
        const newSet = new Set(selectedIds);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        setSelectedIds(newSet);
    };

    return (
        <div className="space-y-4 min-h-[400px]">
            {/* Barre d'actions groupées (Bulk Actions) */}
            {selectedIds.size > 0 && (
                <div className="sticky top-0 z-20 flex items-center justify-between p-3 bg-zinc-50 text-zinc-600 animate-in slide-in-from-top-4">
                    <div className="flex items-center gap-3 ml-2">
                        <span className="bg-zinc-900 text-[10px] px-2 py-1 rounded-full uppercase font-black text-white">
                            {selectedIds.size} sélectionné(s)
                        </span>
                    </div>
                    <div className="flex gap-2">
                        {isTrashMode ? (
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer" onClick={() => restoreMutation.mutate(Array.from(selectedIds), { onSuccess: () => setSelectedIds(new Set()) })}>
                                <RotateCcw className="w-4 h-4 mr-2" /> Restaurer
                            </Button>
                        ) : (
                            <>
                                <Button size="sm" variant="outline" className="text-zinc-600 border-zinc-600 hover:bg-zinc-800 cursor-pointer" onClick={() => setIsMoveModalOpen(true)}>
                                    <FolderInput className="w-4 h-4 mr-2" /> Déplacer
                                </Button>
                                <Button size="sm" variant="destructive" className="cursor-pointer" onClick={() => bulkDeleteMutation.mutate(Array.from(selectedIds), { onSuccess: () => setSelectedIds(new Set()) })}>
                                    <Trash2 className="w-4 h-4 mr-2" /> Corbeille
                                </Button>
                            </>
                        )}
                        <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-zinc-600 cursor-pointer" onClick={() => setSelectedIds(new Set())}>Annuler</Button>
                    </div>
                </div>
            )}

            {/* Grille de médias */}
            {allMedia.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {allMedia.map((media) => {
                        if (!media) return null;
                        const isCurrent = String(selectedId) === String(media.id);
                        const isChecked = selectedIds.has(media.id);

                        return (
                            <div key={media.id} className={cn(
                                "group relative aspect-square rounded-2xl border-2 transition-all duration-300 bg-white shadow-sm overflow-hidden",
                                isCurrent ? "border-zinc-600 ring-4 ring-zinc-50" : isChecked ? "border-zinc-500 scale-95" : "border-transparent hover:border-slate-200"
                            )}>
                                {/* Preview / Clic principal */}
                                <div onClick={() => onSingleSelect?.(media)} className="w-full h-full cursor-pointer">
                                    <MediaPreview media={media} className={isChecked ? "opacity-50 grayscale" : ""} />
                                </div>

                                {/* Checkbox / Multi-sélection */}
                                {multiSelect && (
                                    <div 
                                        onClick={(e) => { e.stopPropagation(); toggleSelection(media.id); }}
                                        className={cn(
                                            "absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10",
                                            isChecked ? "bg-zinc-600 border-zinc-600 text-white" : "bg-white/80 border-slate-300 opacity-0 group-hover:opacity-100"
                                        )}
                                    >
                                        {isChecked && <Check className="w-4 h-4" />}
                                    </div>
                                )}
                                
                                {/* Badge de type (Optionnel) */}
                                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] text-white uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    {media.type}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : !libraryQuery.isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed rounded-3xl bg-slate-50/50">
                    <AlertCircle className="w-10 h-10 mb-2 opacity-20" />
                    <p className="text-sm font-medium">Aucun média trouvé</p>
                </div>
            )}

            {/* Pagination Infinie */}
            {libraryQuery.hasNextPage && (
                <div className="flex justify-center py-10">
                    <Button variant="outline" className="rounded-full px-8 gap-2" onClick={() => libraryQuery.fetchNextPage()} disabled={libraryQuery.isFetchingNextPage}>
                        {libraryQuery.isFetchingNextPage ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                        Charger plus de fichiers
                    </Button>
                </div>
            )}

            {/* Modale de déplacement */}
            <MoveCollectionModal 
                isOpen={isMoveModalOpen}
                onClose={() => setIsMoveModalOpen(false)}
                isPending={moveCollectionMutation.isPending}
                onConfirm={(col) => moveCollectionMutation.mutate({ ids: Array.from(selectedIds), collection: col }, { onSuccess: () => { setIsMoveModalOpen(false); setSelectedIds(new Set()); }})}
            />
        </div>
    );
}