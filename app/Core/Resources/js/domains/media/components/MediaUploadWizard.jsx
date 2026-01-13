import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui';
import { 
    Upload,  
    Search, 
    X, 
    PlaySquareIcon, 
    Sparkles,
    PlusCircle
} from 'lucide-react';

import { UploadTab } from '../tabs/UploadTab';
import { URLTab } from '../tabs/URLTab';
import { UnsplashTab } from '../tabs/UnsplashTab';
import { AITab } from '../tabs/AITab';
import { cn } from '@lib';

export function MediaUploadWizard({ onComplete }) {
    return (
        <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-[650px] w-full max-w-4xl border border-slate-100">
            
            {/* HEADER DU WIZARD */}
            <div className="px-8 py-5 border-b flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-100 rounded-xl text-zinc-600">
                        <PlusCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">Ajouter de nouveaux médias</h3>
                    </div>
                </div>
                <button 
                    onClick={onComplete} 
                    className="p-2 hover:bg-slate-200 rounded-full transition-all text-slate-400"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* SYSTÈME D'ONGLETS */}
            <Tabs defaultValue="upload" className="flex-1 flex flex-col overflow-hidden">
                <div className="px-8 py-3 border-b bg-white">
                    <TabsList className="bg-slate-100/50 p-1 rounded-2xl inline-flex w-full justify-start">
                        <TabsTrigger value="upload" className="rounded-xl px-5 py-2.5 gap-2 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Upload className="w-4 h-4 text-zinc-500" /> 
                            Upload Local
                        </TabsTrigger>
                        
                        <TabsTrigger value="url" className="rounded-xl px-5 py-2.5 gap-2 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <PlaySquareIcon className="w-4 h-4 text-red-500" /> 
                            URL / YouTube
                        </TabsTrigger>
                        
                        <TabsTrigger value="unsplash" className="rounded-xl px-5 py-2.5 gap-2 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Search className="w-4 h-4 text-emerald-500" /> 
                            Unsplash
                        </TabsTrigger>
                        
                        <TabsTrigger value="ai" className="rounded-xl px-5 py-2.5 gap-2 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm text-zinc-600">
                            <Sparkles className="w-4 h-4" /> 
                            Générateur IA
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* CONTENU DES ONGLETS */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
                    <TabsContent value="upload" className="h-full m-0 animate-in fade-in slide-in-from-bottom-4">
                        <UploadTab onUploadSuccess={onComplete}/>
                    </TabsContent>
                    
                    <TabsContent value="url" className="h-full m-0 animate-in fade-in slide-in-from-bottom-4">
                        <URLTab onImportSuccess={onComplete} />
                    </TabsContent>

                    <TabsContent value="unsplash" className="h-full m-0 animate-in fade-in slide-in-from-bottom-4">
                        <UnsplashTab onImportSuccess={onComplete} />
                    </TabsContent>

                    <TabsContent value="ai" className="h-full m-0 animate-in fade-in slide-in-from-bottom-4">
                        <AITab onImportSuccess={onComplete} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}