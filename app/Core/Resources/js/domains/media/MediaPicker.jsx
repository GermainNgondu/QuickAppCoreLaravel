import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui';
import { LibraryTab } from './tabs/LibraryTab';
import { UploadTab } from './tabs/UploadTab';
import { URLTab } from './tabs/URLTab';
import { AITab } from './tabs/AITab';
import { X, Search, Image as ImageIcon } from 'lucide-react';

export default function MediaPicker({ onSelect, currentId, onClose, collection = "", accept = "*" }) {
    const [activeTab, setActiveTab] = useState('library');
    const [filters, setFilters] = useState({ search: '', type: '', collection });

    return (
        <div className="flex flex-col h-[700px] w-full max-w-6xl bg-white rounded-[32px] shadow-2xl border overflow-hidden">
            <div className="px-8 py-5 border-b flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-600 rounded-lg text-white"><ImageIcon className="w-4 h-4" /></div>
                    <h3 className="font-bold text-slate-800">Choisir un média</h3>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-all text-slate-400"><X /></button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                <div className="px-8 py-3 border-b bg-white">
                    <TabsList className="bg-slate-100/50 p-1 rounded-xl">
                        <TabsTrigger value="library" className="rounded-lg px-6 font-bold">Bibliothèque</TabsTrigger>
                        <TabsTrigger value="upload" className="rounded-lg px-6 font-bold">Upload</TabsTrigger>
                        <TabsTrigger value="url" className="rounded-lg px-6 font-bold">URL</TabsTrigger>
                        <TabsTrigger value="ai" className="rounded-lg px-6 font-bold text-zinc-600">Générateur IA</TabsTrigger>
                    </TabsList>
                </div>

                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
                    <TabsContent value="library" className="h-full m-0">
                        <LibraryTab 
                            onSingleSelect={(media) => { onSelect(media); onClose(); }}
                            selectedId={currentId}
                            filters={filters}
                            multiSelect={false}
                        />
                    </TabsContent>
                    
                    <TabsContent value="upload" className="h-full m-0">
                        <UploadTab onUploadSuccess={() => setActiveTab('library')} accept={accept} />
                    </TabsContent>

                    <TabsContent value="url" className="h-full m-0">
                        <URLTab onImportSuccess={() => setActiveTab('library')} />
                    </TabsContent>

                    <TabsContent value="ai" className="h-full m-0">
                        <AITab onImportSuccess={() => setActiveTab('library')} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}