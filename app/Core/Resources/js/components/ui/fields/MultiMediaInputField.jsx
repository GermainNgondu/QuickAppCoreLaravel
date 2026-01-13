import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableMediaItem } from '@domains/media/components/SortableMediaItem';
import MediaPicker from '@domains/media/MediaPicker';
import { Dialog, DialogContent, DialogTrigger } from '@ui';
import { Plus, LayoutGrid } from 'lucide-react';

export function MultiMediaInputField({ name, label, collection = "", accept = "*" }) {
    const { watch, setValue } = useFormContext();
    const items = watch(name) || [];
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = items.findIndex(i => i.id === active.id);
            const newIndex = items.findIndex(i => i.id === over.id);
            setValue(name, arrayMove(items, oldIndex, newIndex));
        }
    };

    return (
        <div className="space-y-4 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-slate-400" />
                    <label className="text-sm font-bold text-slate-800">{label}</label>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{items.length} Fichiers</span>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SortableContext items={items.map(i => i.id)} strategy={rectSortingStrategy}>
                        {items.map(item => (
                            <SortableMediaItem 
                                key={item.id} media={item} 
                                onRemove={(id) => setValue(name, items.filter(i => i.id !== id))} 
                            />
                        ))}
                    </SortableContext>

                    <Dialog open={isPickerOpen} onOpenChange={setIsPickerOpen}>
                        <DialogTrigger asChild>
                            <button type="button" className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-zinc-400 hover:text-zinc-600 hover:bg-white transition-all group">
                                <Plus className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold uppercase">Ajouter</span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none [&>button]:hidden">
                            <MediaPicker 
                                accept={accept} collection={collection}
                                onSelect={(newItems) => {
                                    const selectedArray = Array.isArray(newItems) ? newItems : [newItems];
                                    const combined = [...items, ...selectedArray].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
                                    setValue(name, combined);
                                }}
                                onClose={() => setIsPickerOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </DndContext>
        </div>
    );
}