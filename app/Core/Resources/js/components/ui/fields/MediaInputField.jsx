import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { Dialog, DialogContent, DialogTrigger } from '@ui';
import MediaPicker from '@domains/media/MediaPicker';
import { MediaPreview } from '@domains/media/components/MediaPreview';
import { ImagePlus, X, Loader2 } from 'lucide-react';

export function MediaInputField({ name, label, accept = "image/*", collection = "" }) {
    const { setValue, watch } = useFormContext();
    const currentMedia = watch(name);
    const [isLoading, setIsLoading] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    useEffect(() => {
        if (typeof currentMedia === 'number' || (typeof currentMedia === 'string' && !isNaN(currentMedia))) {
            setIsLoading(true);
            axios.get(`/admin/media/${currentMedia}`)
                .then(({ data }) => setValue(name, data))
                .finally(() => setIsLoading(false));
        }
    }, [currentMedia, name, setValue]);

    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-bold text-slate-700">{label}</label>}
            
            {/* On place le Dialog ici pour qu'il englobe tout et soit toujours monté */}
            <Dialog open={isPickerOpen} onOpenChange={setIsPickerOpen}>
                <div className="flex items-center gap-4">
                    <div className="relative w-32 h-32 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 overflow-hidden group">
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="animate-spin text-slate-300" />
                            </div>
                        ) : currentMedia?.url ? (
                            <>
                                <MediaPreview media={currentMedia} />
                                <button 
                                    type="button"
                                    onClick={() => setValue(name, null)}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                > 
                                    <X className="w-3 h-3" /> 
                                </button>
                            </>
                        ) : (
                            /* Trigger uniquement quand il n'y a pas d'image */
                            <DialogTrigger asChild>
                                <button type="button" className="w-full h-full flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                                    <ImagePlus className="w-6 h-6 mb-1" />
                                    <span className="text-[10px] font-bold uppercase">Choisir</span>
                                </button>
                            </DialogTrigger>
                        )}
                    </div>
                    
                    {currentMedia?.url && (
                        <div className="flex-1">
                            <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{currentMedia.name}</p>
                            <p className="text-[10px] text-slate-400">{currentMedia.size_human} • {currentMedia.extension?.toUpperCase()}</p>
                            
                            {/* Ce bouton fonctionne maintenant car le Dialog est parent */}
                            <button 
                                type="button" 
                                onClick={() => setIsPickerOpen(true)}
                                className="text-[10px] font-bold text-zinc-600 mt-2 hover:underline cursor-pointer"
                            > 
                                Modifier le fichier 
                            </button>
                        </div>
                    )}
                </div>

                {/* Le contenu de la modale reste le même mais il est toujours disponible */}
                <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none [&>button]:hidden">
                    <MediaPicker 
                        accept={accept} 
                        collection={collection}
                        onSelect={(m) => {
                            setValue(name, m);
                            setIsPickerOpen(false); 
                        }}
                        onClose={() => setIsPickerOpen(false)}
                        currentId={currentMedia?.id}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}