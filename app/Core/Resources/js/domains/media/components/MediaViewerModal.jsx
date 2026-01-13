import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from '@ui';
import { MediaPreview } from './MediaPreview';
import { useMedia } from '@hooks';
import { Edit2, Check, X, Download, ExternalLink, Loader2 } from 'lucide-react';

export function MediaViewerModal({ media, isOpen, onClose }) {
    const { updateMutation } = useMedia();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', alt: '' });

    useEffect(() => {
        if (media) {
            setFormData({ 
                name: media.name || '', 
                alt: media.custom_properties?.alt || '' 
            });
        }
    }, [media]);

    if (!media) return null;

    const handleSave = () => {
        updateMutation.mutate({ id: media.id, ...formData }, {
            onSuccess: () => setIsEditing(false)
        });
    };

    const type = media.type || '';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl p-0 overflow-hidden border-none shadow-2xl">
                <div className="flex flex-col md:flex-row h-[85vh] bg-white">
                    {/* Zone de prévisualisation */}
                    <div className="flex-2 bg-slate-950 flex items-center justify-center p-6 relative">
                        <MediaPreview media={media} showPlayer={true} className="max-h-full rounded-md shadow-2xl" />

                        {type !== 'youtube' && (
                            <Button 
                                variant="secondary" size="sm" 
                                className="absolute top-4 right-4 gap-2 opacity-70 hover:opacity-100"
                                onClick={() => window.open(media.url, '_blank')}
                            >
                                <ExternalLink className="w-4 h-4" /> Original
                            </Button>
                        )}
                    </div>

                    {/* Zone d'édition et infos */}
                    <div className="flex-1 flex flex-col border-l border-slate-100">
                        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
                            <DialogTitle className="text-sm font-bold truncate pr-4">{media.file_name}</DialogTitle>
                            <Button 
                                variant="ghost" size="sm" 
                                onClick={() => setIsEditing(!isEditing)}
                                className={isEditing ? "text-red-500" : "text-zinc-600"}
                            >
                                {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                            </Button>
                        </div>

                        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nom du fichier</label>
                                    {isEditing ? (
                                        <input 
                                            className="w-full mt-1 p-2 bg-slate-50 border rounded-lg text-sm"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    ) : <p className="text-sm font-medium text-slate-700 mt-1">{media.name}</p>}
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Texte Alternatif (SEO)</label>
                                    {isEditing ? (
                                        <textarea 
                                            className="w-full mt-1 p-2 bg-slate-50 border rounded-lg text-sm h-24"
                                            value={formData.alt}
                                            onChange={(e) => setFormData({...formData, alt: e.target.value})}
                                            placeholder="Décrivez l'image..."
                                        />
                                    ) : <p className="text-sm text-slate-500 mt-1 italic">{formData.alt || "Non défini"}</p>}
                                </div>
                            </div>

                            <div className="pt-6 border-t grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Taille</p>
                                    <p className="text-xs font-mono text-slate-600">{media.size_human}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Extension</p>
                                    <p className="text-xs font-mono text-slate-600 uppercase">{media.extension || media.mime_type?.split('/')[1]}</p>
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="p-4 bg-slate-50 border-t">
                                <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full bg-zinc-600 text-white gap-2">
                                    {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                    Enregistrer
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}