import React, { useState } from 'react';
import { LibraryTab } from './tabs/LibraryTab';
import { MediaViewerModal } from './components/MediaViewerModal';
import { MediaUploadWizard } from './components/MediaUploadWizard';
import { Plus, Search, Trash2, ArrowDown, ArrowUp, } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, Button } from '@ui';
import { cn } from '@lib';

export default function MediaManagerList() {
    const [viewMode, setViewMode] = useState('active'); 
    const [selectedMediaForPreview, setSelectedMediaForPreview] = useState(null);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    
    const [filters, setFilters] = useState({ 
        search: '', 
        type: '', 
        collection: '', 
        sort_by: 'created_at', 
        sort_order: 'desc',
        status: 'active' 
    });

    const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

    return (
        <div className="p-8 space-y-8  min-h-screen">
            {/* Header & Statistiques */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Médiathèque</h1>
                </div>
                
                <div className="flex bg-white p-1 rounded-2xl border shadow-sm">
                    <button 
                        onClick={() => { setViewMode('active'); updateFilter('status', 'active'); }}
                        className={cn("px-6 py-2 rounded-xl text-xs font-bold transition-all", viewMode === 'active' ? "bg-slate-900 text-white" : "text-slate-400")}
                    > Actifs </button>
                    <button 
                        onClick={() => { setViewMode('trash'); updateFilter('status', 'trash'); }}
                        className={cn("px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2", viewMode === 'trash' ? "bg-red-600 text-white" : "text-slate-400")}
                    > <Trash2 className="w-3.5 h-3.5" /> Corbeille </button>
                </div>
            </div>

            {/* Barre de Filtres */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" placeholder="Rechercher un fichier..." 
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-zinc-500"
                        onChange={(e) => updateFilter('search', e.target.value)}
                    />
                </div>

                <select 
                    className="bg-slate-50 border-none rounded-xl text-xs font-bold p-3 outline-none"
                    onChange={(e) => updateFilter('collection', e.target.value)}
                >
                    <option value="">Toutes les collections</option>
                    <option value="library">Bibliothèque</option>
                    <option value="products">Produits</option>
                </select>

                <div className="h-8 w-px bg-slate-100" />

                <button 
                    onClick={() => updateFilter('sort_order', filters.sort_order === 'desc' ? 'asc' : 'desc')}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-zinc-600"
                >
                    {filters.sort_order === 'desc' ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                </button>

                <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-zinc-600 text-white rounded-2xl px-6 py-6 gap-2 shadow-lg shadow-zinc-100 cursor-pointer">
                            <Plus className="w-5 h-5" /> Ajouter
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 border-none bg-transparent shadow-none [&>button]:hidden">
                        <MediaUploadWizard onComplete={() => setIsUploadOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Grille principale */}
            <div className="p-4 min-h-[500px]">
                <LibraryTab 
                    filters={filters} 
                    isTrashMode={viewMode === 'trash'}
                    onSingleSelect={(media) => setSelectedMediaForPreview(media)}
                />
            </div>

            <MediaViewerModal 
                media={selectedMediaForPreview} 
                isOpen={!!selectedMediaForPreview} 
                onClose={() => setSelectedMediaForPreview(null)} 
            />
        </div>
    );
}