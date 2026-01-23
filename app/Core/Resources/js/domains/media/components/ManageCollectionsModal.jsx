import React, { useState } from 'react';
import { useMediaCollections } from '@hooks';
import { Pencil, Trash2, Check, X, Loader2, Plus } from 'lucide-react';
import { Button, Input } from '@ui';
import { toast } from 'sonner';

/**
 * Composant de gestion CRUD pour les collections de médias.
 */
export function ManageCollectionsModal() {
    // Utilisation du hook personnalisé pour les opérations de données
    const { 
        collections, 
        isLoading, 
        createCollection, 
        isCreating,
        updateCollection, 
        isUpdating,
        deleteCollection, 
        isDeleting 
    } = useMediaCollections();

    // États locaux pour la création et l'édition
    const [newName, setNewName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    // --- LOGIQUE DE CRÉATION ---
    const handleCreate = () => {
        if (!newName.trim()) return;
        
        createCollection({ name: newName }, {
            onSuccess: () => {
                setNewName('');
                toast.success("Collection ajoutée avec succès");
            }
        });
    };

    // --- LOGIQUE DE MISE À JOUR ---
    const startEditing = (col) => {
        setEditingId(col.id);
        setEditValue(col.name);
    };

    const handleUpdate = (id) => {
        if (!editValue.trim()) return;
        
        updateCollection({ id, name: editValue }, {
            onSuccess: () => {
                setEditingId(null);
                toast.success("Collection renommée");
            }
        });
    };

    // --- LOGIQUE DE SUPPRESSION ---
    const handleDelete = (id) => {
        // Simple confirmation native (peut être remplacée par un AlertDialog de votre UI Kit)
        if (window.confirm("Supprimer cette collection ? Les fichiers resteront accessibles dans 'Toutes les collections'.")) {
            deleteCollection(id);
        }
    };

    return (
        <div className="space-y-6">
            {/* SECTION : CRÉATION RAPIDE */}
            <div className="flex items-center gap-2 p-1">
                <Input 
                    placeholder="Nom de la nouvelle collection..." 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    className="flex-1"
                />
                <Button 
                    onClick={handleCreate} 
                    disabled={isCreating || !newName.trim()}
                    size="icon"
                >
                    {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                </Button>
            </div>

            <div className="h-px bg-slate-100" />

            {/* SECTION : LISTE ET ACTIONS */}
            <div className="space-y-1 max-h-[350px] overflow-y-auto pr-1">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">
                    Dossiers existants
                </h4>

                {isLoading && (
                    <div className="flex justify-center p-8">
                        <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
                    </div>
                )}

                {!isLoading && collections.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-sm italic">
                        Aucune collection personnalisée.
                    </div>
                )}

                {collections.map((col) => (
                    <div 
                        key={col.id} 
                        className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl group transition-all"
                    >
                        {editingId === col.id ? (
                            // MODE ÉDITION INLINE
                            <div className="flex items-center gap-2 flex-1">
                                <Input 
                                    value={editValue} 
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="h-9 py-1"
                                    autoFocus
                                />
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 text-green-600 hover:bg-green-50" 
                                    onClick={() => handleUpdate(col.id)}
                                    disabled={isUpdating}
                                >
                                    <Check className="w-4 h-4" />
                                </Button>
                                <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 text-slate-400" 
                                    onClick={() => setEditingId(null)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            // MODE AFFICHAGE
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                                    <span className="text-sm font-semibold text-slate-700">{col.name}</span>
                                </div>
                                
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" 
                                        onClick={() => startEditing(col)}
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" 
                                        onClick={() => handleDelete(col.id)}
                                        disabled={isDeleting}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}