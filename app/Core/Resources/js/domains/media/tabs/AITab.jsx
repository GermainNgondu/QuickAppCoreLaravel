import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useMedia } from '@hooks';
import { Wand2, Loader2, Sparkles, DownloadCloud } from 'lucide-react';
import { cn } from '@lib';

export function AITab({ onSelect }) {
    const [prompt, setPrompt] = useState('');
    const [generatedResults, setGeneratedResults] = useState([]);
    
    // On récupère la mutation d'import global pour sauvegarder le résultat choisi
    const { importMutation } = useMedia();

    // Mutation spécifique pour appeler l'action de génération IA backend
    const generateMutation = useMutation({
        mutationFn: async (promptText) => {
            // Appelle GenerateAiMediaAction côté Laravel
            const { data } = await axios.post('/api/admin/media/ai-generate', { 
                prompt: promptText,
                size: '1024x1024' // Optionnel, géré par le DTO backend
            });
            return data.results; // Retourne un tableau standardisé : [{ id, url, thumb, source }]
        },
        onSuccess: (data) => {
            setGeneratedResults(data);
        },
        onError: (error) => {
            // Ici, vous pourriez déclencher un toast d'erreur global
            console.error("Erreur de génération IA:", error);
            alert("La génération a échoué. Veuillez réessayer avec un prompt différent.");
        }
    });

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setGeneratedResults([]); // Reset des résultats précédents
        generateMutation.mutate(prompt);
    };

    const handleImport = async (item) => {
        // On utilise l'action d'import générique pour télécharger l'image de l'IA vers notre serveur local
        const newLocalMedia = await importMutation.mutateAsync({
            url: item.url,
            name: prompt.slice(0, 50) + '... (AI)', // On utilise le début du prompt comme nom
            source: item.source // 'ai'
        });
        // Une fois téléchargé, on le sélectionne et on ferme le picker
        onSelect(newLocalMedia);
    };

    const isLoading = generateMutation.isPending || importMutation.isPending;

    return (
        <div className="flex flex-col h-full gap-6 relative">
            {/* Overlay de chargement global */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-zinc-600 font-medium animate-in fade-in">
                    {generateMutation.isPending ? (
                        <>
                            <Loader2 className="w-12 h-12 animate-spin mb-4" />
                            <p className="flex items-center gap-2"><Sparkles className="w-5 h-5 animate-pulse"/> L'IA imagine votre requête...</p>
                            <span className="text-xs text-slate-500 mt-2">Cela peut prendre quelques secondes.</span>
                        </>
                    ) : (
                        <>
                            <Loader2 className="w-10 h-10 animate-spin mb-4" />
                            <p className="flex items-center gap-2"><DownloadCloud className="w-5 h-5"/> Téléchargement vers la bibliothèque...</p>
                        </>
                    )}
                </div>
            )}

            {/* Zone de saisie du prompt */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="ai-prompt" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-zinc-500" />
                        Décrivez l'image que vous souhaitez créer
                    </label>
                    <textarea
                        id="ai-prompt"
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 outline-none resize-none text-slate-700 placeholder:text-slate-400"
                        placeholder="Ex: Un chat astronaute flottant dans une nébuleuse colorée, style peinture à l'huile..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
                        disabled={isLoading}
                    />
                    <p className="text-xs text-slate-500 mt-2 text-right">Soyez précis pour de meilleurs résultats.</p>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isLoading}
                    className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white transition-all shadow-md",
                        !prompt.trim() || isLoading 
                            ? "bg-slate-300 cursor-not-allowed shadow-none"
                            : "bg-gradient-to-r from-zinc-600 to-purple-600 hover:from-zinc-700 hover:to-purple-700 hover:shadow-lg hover:-translate-y-0.5"
                    )}
                >
                    <Wand2 className={cn("w-5 h-5", isLoading ? "animate-spin" : "")} />
                    {isLoading ? 'Génération en cours...' : 'Générer l\'image'}
                </button>
            </div>

            {/* Zone de résultats */}
            <div className="flex-1 overflow-y-auto border-t border-slate-100 pt-6">
                {generatedResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {generatedResults.map((item, index) => (
                            <div key={index} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 shadow-sm ring-1 ring-slate-200/50">
                                <img src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Generated result" />
                                
                                {/* Overlay au survol pour importer */}
                                <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-all duration-300 cursor-pointer backdrop-blur-sm"
                                     onClick={() => handleImport(item)}>
                                    <DownloadCloud className="w-10 h-10 mb-3 animate-bounce" />
                                    <span className="font-bold text-lg">Importer ce résultat</span>
                                    <span className="text-xs opacity-80 mt-1">L'ajouter à la bibliothèque locale</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !isLoading && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/30">
                            <Wand2 className="w-12 h-12 mb-4 opacity-50" />
                            <p className="font-medium text-slate-600 mb-1">Prêt à créer</p>
                            <p className="text-sm">Entrez une description ci-dessus pour lancer la magie de l'IA.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}