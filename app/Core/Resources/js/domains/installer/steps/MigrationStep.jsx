import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Database, CheckCircle2 } from 'lucide-react';

export function MigrationStep() {
    const [progress, setProgress] = useState(0);
    const [total, setTotal] = useState(0);
    const [currentTask, setCurrentTask] = useState("Initialisation...");
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const startMigration = async () => {
            try {
                // 1. On demande le total
                const initRes = await axios.post('/install', { status: true });
                const totalCount = initRes.data.total;
                setTotal(totalCount);

                if (totalCount === 0) {
                    finish();
                    return;
                }

                // 2. On boucle pour exécuter chaque migration
                let remaining = totalCount;
                while (remaining > 0) {
                    const res = await axios.post('/install');
                    if (res.data.success) {
                        remaining = res.data.remaining;
                        setCurrentTask(`Migration : ${res.data.migrated}`);
                        // Calcul du pourcentage
                        const percent = Math.round(((totalCount - remaining) / totalCount) * 100);
                        setProgress(percent);
                    } else if (res.data.finished) {
                        remaining = 0;
                    }
                }
                finish();
            } catch (error) {
                setCurrentTask("Erreur fatale lors des migrations.");
            }
        };

        const finish = () => {
            setProgress(100);
            setIsFinished(true);
            setCurrentTask("Base de données à jour !");
            // Redirection automatique vers l'étape Admin après 1.5s
            setTimeout(() => window.location.reload(), 1500);
        };

        startMigration();
    }, []);

    return (
        <div className="space-y-8 py-6">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-full transition-colors ${isFinished ? 'bg-emerald-100' : 'bg-primary/10'}`}>
                    {isFinished ? (
                        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    ) : (
                        <Database className="h-10 w-10 text-primary animate-pulse" />
                    )}
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Installation des tables</h2>
                    <p className="text-slate-500 text-sm">Veuillez ne pas fermer cette page.</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-600">{currentTask}</span>
                    <span className="text-primary">{progress}%</span>
                </div>
                
                {/* Barre de progression */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div 
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {!isFinished && (
                <div className="flex justify-center items-center gap-2 text-sm text-slate-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Traitement des fichiers SQL...
                </div>
            )}
        </div>
    );
}