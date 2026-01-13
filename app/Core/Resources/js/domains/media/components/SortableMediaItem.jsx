import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MediaPreview } from './MediaPreview';
import { X, GripVertical } from 'lucide-react';
import { cn } from '@lib';

export function SortableMediaItem({ media, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: media.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 0
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className={cn(
                "group relative aspect-square rounded-xl border bg-white overflow-hidden shadow-sm",
                isDragging && "ring-2 ring-indigo-500 scale-105 opacity-80"
            )}
        >
            <MediaPreview media={media} />

            {/* Handle pour le Drag */}
            <div 
                {...attributes} {...listeners}
                className="absolute top-2 left-2 p-1 bg-white/90 rounded border opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
            >
                <GripVertical className="w-3 h-3 text-slate-400" />
            </div>

            {/* Bouton de retrait */}
            <button 
                type="button"
                onClick={() => onRemove(media.id)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <X className="w-3 h-3" />
            </button>
        </div>
    );
}