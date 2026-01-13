import React from 'react';
import { FileText, Music, PlayCircle, PlayIcon, File, Film } from 'lucide-react';
import { cn } from '@lib';

export function MediaPreview({ media, className , showPlayer = false}) {
    if (!media) return null;

    const type = media.type || 'document';
    const containerClass = cn("relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-100 rounded-lg", className);

    switch (type) {
        case 'image':
            return (
                <div className={containerClass}>
                    <img src={media.thumb_url || media.url} className="w-full h-full object-cover" alt={media.name} />
                </div>
            );

        case 'youtube':
            const videoId = media.custom_properties?.youtube_id;
            
            // SI ON EST DANS LA MODALE : On affiche le lecteur vidéo
            if (showPlayer && videoId) {
                return (
                    <div className={cn(containerClass, "bg-black")}>
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            className="w-full h-full border-none"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                );
            }

            return (
                <div className={cn(containerClass, "bg-slate-900 group")}>
                    <img 
                        src={media.url || media.thumb_url} 
                        className="w-full h-full object-cover opacity-80 transition-opacity group-hover:opacity-60" 
                        alt={media.name}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600 text-white rounded-full p-3 shadow-xl transform transition-transform group-hover:scale-110">
                            <PlayIcon className="w-6 h-6 fill-current" />
                        </div>
                    </div>
                </div>
            );
        case 'video':
            return (
                <div className={cn(containerClass, "bg-slate-900")}>
                    <Film className="w-8 h-8 text-white/20" />
                    <div className="absolute bottom-2 right-2">
                        <PlayCircle className="w-5 h-5 text-white" />
                    </div>
                </div>
            );

        case 'document':
            const isPdf = media.mime_type === 'application/pdf';
            return (
                <div className={cn(containerClass, isPdf ? "bg-red-50" : "bg-zinc-50")}>
                    <FileText className={cn("w-8 h-8", isPdf ? "text-red-500" : "text-zinc-500")} />
                    <span className="absolute bottom-2 text-[9px] font-bold text-slate-400 uppercase truncate px-2 w-full text-center">
                        {media.file_name?.split('.').pop()}
                    </span>
                </div>
            );

        default:
            return (
                <div className={containerClass}>
                    <File className="w-8 h-8 text-slate-300" />
                </div>
            );
    }
}