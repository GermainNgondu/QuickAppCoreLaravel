import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, ImageIcon, Globe, Loader2, Plus, AlertCircle, Play, PlaySquareIcon } from 'lucide-react';
import { useMedia } from '@hooks';
import { Button } from '@ui';
import { cn } from '@lib';

export function URLTab({ onImportSuccess, accept = "*" }) {
    const [url, setUrl] = useState('');
    const [detectedType, setDetectedType] = useState(null);
    const [imageLoadError, setImageLoadError] = useState(false);
    const { importMutation } = useMedia();

    // Regex
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    const imageRegex = /\.(jpeg|jpg|gif|png|webp|avif)(?:\?.*)?$/i;

    // Helper pour extraire l'ID YouTube et obtenir la miniature
    const getYoutubeData = (url) => {
        const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
        const id = (match && match[2].length === 11) ? match[2] : null;
        return id ? {
            id: id,
            thumb: `https://img.youtube.com/vi/${id}/mqdefault.jpg`
        } : null;
    };

    const youtubeData = detectedType === 'youtube' ? getYoutubeData(url) : null;

    useEffect(() => {
        const cleanUrl = url.trim();
        setImageLoadError(false);

        if (!cleanUrl) {
            setDetectedType(null);
            return;
        }

        if (youtubeRegex.test(cleanUrl)) {
            setDetectedType('youtube');
        } else if (imageRegex.test(cleanUrl)) {
            setDetectedType('image');
        } else {
            setDetectedType(null);
        }
    }, [url]);

    // Vérification de la compatibilité avec la prop "accept"
    const isAllowed = () => {
        if (!detectedType) return false;
        if (accept === "*") return true;
        if (accept.includes('image') && detectedType === 'image') return true;
        if (accept.includes('video') && detectedType === 'youtube') return true;
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAllowed() || imageLoadError) return;
        
        importMutation.mutate({ url, type: detectedType }, { 
            onSuccess: () => { 
                setUrl(''); 
                onImportSuccess?.(); 
            }
        });
    };

    return (
        <div className="max-w-xl mx-auto py-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        {detectedType === 'youtube' ? <PlaySquareIcon className="text-red-500 w-5 h-5" /> : 
                         detectedType === 'image' ? <ImageIcon className="text-zinc-500 w-5 h-5" /> : 
                         <Globe className="text-slate-300 w-5 h-5" />}
                    </div>
                    <input 
                        type="url" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={accept.includes('video') ? "Collez un lien YouTube..." : "Collez un lien d'image..."}
                        className={cn(
                            "w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all",
                            isAllowed() ? "border-zinc-500 bg-white" : url && !isAllowed() ? "border-red-300" : "border-slate-100"
                        )}
                    />
                </div>

                {/* --- ZONE DE PRÉVISUALISATION --- */}
                {url && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        {/* PREVIEW YOUTUBE AVEC MINIATURE REELLES */}
                        {detectedType === 'youtube' && isAllowed() && youtubeData && (
                            <div className="p-3 bg-slate-900 rounded-2xl flex gap-4 items-center border border-slate-800 shadow-xl">
                                <div className="w-32 h-20 bg-black rounded-xl overflow-hidden shrink-0 relative group">
                                    <img src={youtubeData.thumb} className="w-full h-full object-cover opacity-70" alt="YT Thumb" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Play className="w-6 h-6 text-white fill-white" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-black uppercase text-red-500 tracking-wider">Vidéo YouTube détectée</p>
                                    <p className="text-xs text-slate-300 truncate mt-1">ID: {youtubeData.id}</p>
                                </div>
                            </div>
                        )}

                        {/* PREVIEW IMAGE*/}
                        {detectedType === 'image' && isAllowed() && !imageLoadError && (
                            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex gap-4 items-center">
                                <div className="w-24 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                                    <img src={url} className="w-full h-full object-cover" onError={() => setImageLoadError(true)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-black uppercase text-emerald-600 tracking-wider">Image prête à l'import</p>
                                    <p className="text-xs text-slate-400 truncate">{url}</p>
                                </div>
                            </div>
                        )}

                        {/* MESSAGE D'ERREUR SI TYPE NON AUTORISÉ */}
                        {url && detectedType && !isAllowed() && (
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex gap-3 text-red-700">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p className="text-sm font-bold">
                                    Ce champ n'accepte que des {accept.includes('image') ? 'images' : 'vidéos'}.
                                </p>
                            </div>
                        )}
                    </div>
                )}
                
                <Button 
                    disabled={!isAllowed() || importMutation.isPending} 
                    className={cn(
                        "w-full py-7 rounded-2xl font-bold transition-all",
                        isAllowed() ? "bg-zinc-600 text-white" : "bg-slate-100 text-slate-300"
                    )}
                >
                    {importMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
                    Ajouter le média
                </Button>
            </form>
        </div>
    );
}