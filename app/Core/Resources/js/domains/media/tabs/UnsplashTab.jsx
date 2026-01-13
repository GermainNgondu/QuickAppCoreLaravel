import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useMedia } from '@hooks';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '@lib';

export function UnsplashTab({ onSelect }) {
    const [query, setQuery] = useState('');
    const { importMutation } = useMedia();

    const { data: results, isLoading, refetch } = useQuery({
        queryKey: ['unsplash', query],
        queryFn: async () => {
            if (!query) return [];
            const { data } = await axios.get('/admin/media/search', { params: { source: 'unsplash', query } });
            return data.results;
        },
        enabled: false // On ne cherche que sur clic/entrée
    });

    const handleImport = async (item) => {
        const media = await importMutation.mutateAsync({
            url: item.url,
            name: item.description || 'Unsplash Image',
            source: 'unsplash'
        });
        onSelect(media);
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex gap-2">
                <input 
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-zinc-500 outline-none" 
                    placeholder="Chercher sur Unsplash..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && refetch()}
                />
                <button onClick={() => refetch()} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5"/> : <Search className="w-5 h-5"/>}
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 overflow-y-auto">
                {results?.map((item) => (
                    <div key={item.id} onClick={() => handleImport(item)} className="relative group aspect-video cursor-pointer rounded-lg overflow-hidden bg-slate-100">
                        <img src={item.thumb} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                            Importer
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}