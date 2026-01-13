import React, { useCallback, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2, CheckCircle, AlertCircle, ImageIcon, Film } from 'lucide-react';
import { useMedia } from '@hooks';
import { Progress } from '@ui';
import { cn } from '@lib';

export function UploadTab({ onUploadSuccess, accept = "*" }) {
    const { uploadMutation } = useMedia();
    const [uploads, setUploads] = useState([]);

    const acceptedTypes = useMemo(() => {
        if (accept === "image/*") {
            return { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.avif'] };
        }
        if (accept === "video/*") {
            return { 'video/*': ['.mp4', '.mpeg', '.avi', '.mov'] };
        }
        if(accept === "document/*") {
            return { 'document/*': ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'] };
        }
        if(accept === "zip") {
            return { 'zip': ['.zip'] };
        }
        if(accept === "audio/*") {
            return { 'audio/*': ['.mp3', '.wav', '.ogg'] };
        }
        return undefined; // Accepte tout par défaut
    }, [accept]);

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        // Traitement des fichiers valides
        const newUploads = acceptedFiles.map(file => ({
            file,
            progress: 0,
            status: 'pending',
            id: Math.random().toString(36).substr(2, 9)
        }));

        setUploads(prev => [...prev, ...newUploads]);

        newUploads.forEach(item => {
            const formData = new FormData();
            formData.append('file', item.file);

            uploadMutation.mutate(formData, {
                onSuccess: () => {
                    setUploads(prev => prev.map(u => u.id === item.id ? { ...u, status: 'success', progress: 100 } : u));
                    if (onUploadSuccess) onUploadSuccess();
                },
                onError: () => {
                    setUploads(prev => prev.map(u => u.id === item.id ? { ...u, status: 'error' } : u));
                }
            });
        });
    }, [uploadMutation, onUploadSuccess]);

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({ 
        onDrop,
        accept: acceptedTypes,
        multiple: true
    });

    return (
        <div className="space-y-6">
            {/* ZONE DE DROP */}
            <div {...getRootProps()} className={cn(
                "border-4 border-dashed rounded-[32px] p-12 flex flex-col items-center justify-center transition-all cursor-pointer",
                isDragActive ? "border-zinc-500 bg-zinc-50" : "border-slate-100 hover:border-slate-200 bg-slate-50/50",
                fileRejections.length > 0 && "border-red-200 bg-red-50"
            )}>
                <input {...getInputProps()} />
                
                <div className={cn(
                    "w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-4 transition-transform",
                    isDragActive ? "scale-110 bg-zinc-600 text-white" : "bg-white text-zinc-600"
                )}>
                    {accept.includes('image') ? <ImageIcon className="w-8 h-8" /> : 
                     accept.includes('video') ? <Film className="w-8 h-8" /> : 
                     <Upload className="w-8 h-8" />}
                </div>

                <h4 className="text-lg font-bold text-slate-800">
                    {isDragActive ? "Lâchez pour envoyer" : `Glissez vos ${accept.includes('video') ? 'vidéos' : 'images'} ici`}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                    Format autorisé : {accept === "*" ? "Tous fichiers" : accept.includes('image') ? "JPG, PNG, WEBP" : accept.includes('video') ? "MP4, MOV" : accept.includes('document') ? "PDF, DOC, DOCX" : accept.includes('zip') ? "ZIP" : accept.includes('audio') ? "MP3, WAV, OGG" : "Tous fichiers"}
                </p>
            </div>

            {/* ERREURS DE FORMAT (SI FICHIER REFUSÉ) */}
            {fileRejections.length > 0 && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 animate-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-sm font-bold">Fichier non supporté</p>
                        <ul className="text-xs mt-1 list-disc list-inside opacity-80">
                            {fileRejections.map(({ file, errors }) => (
                                <li key={file.name}>{file.name} : format invalide</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* LISTE DES UPLOADS EN COURS */}
            {uploads.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {uploads.map((item) => (
                        <div key={item.id} className="p-4 bg-white border rounded-2xl flex items-center gap-4 shadow-sm border-slate-100">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                {item.status === 'success' ? <CheckCircle className="text-emerald-500" /> : <Loader2 className="animate-spin" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-slate-700 truncate">{item.file.name}</p>
                                <Progress value={item.progress} className="h-1.5 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}