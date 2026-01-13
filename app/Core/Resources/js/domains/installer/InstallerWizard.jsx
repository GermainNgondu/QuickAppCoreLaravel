import React from 'react';
import { 
    LanguageStep, 
    RequirementsStep, 
    DatabaseStep, 
    MigrationStep, 
    AdminStep 
} from './steps';
import { Card, CardContent } from '@ui';
import { Monitor, Database, UserCheck, Check, Settings2 } from 'lucide-react';
import { cn, __ } from '@lib';

export default function InstallerWizard({ step, ...props }) {
    
    // 1. Définition des 3 étapes VISUELLES uniquement
    const visualSteps = [
        { id: 0, label: __('system'), icon: Monitor, subSteps: [0, 1] },
        { id: 1, label: __('database'), icon: Database, subSteps: [2, 3] },
        { id: 2, label: __('finalization'), icon: UserCheck, subSteps: [4] },
    ];

    // 2. Trouver quel point de progression est actif
    const activeVisualIdx = visualSteps.findIndex(vs => vs.subSteps.includes(step));

    const renderStepContent = () => {
        switch (step) {
            case 0: return <LanguageStep {...props} />;
            case 1: return <RequirementsStep {...props} />;
            case 2: return <DatabaseStep {...props} />;
            case 3: return <MigrationStep {...props} />;
            case 4: return <AdminStep {...props} />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            
            <div className="mb-10 text-center">
                <div className="w-14 h-14 bg-zinc-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white shadow-xl shadow-zinc-200">
                    <Settings2 className="w-8 h-8" />
                </div>
            </div>

            <div className="w-full max-w-xl">
                
                {/* Stepper à 3 points */}
                <div className="relative flex justify-between mb-12 px-4">
                    <div className="absolute top-5 left-0 w-full h-[2px] bg-zinc-200 z-0" />
                    
                    {visualSteps.map((vs, idx) => {
                        const Icon = vs.icon;
                        const isCompleted = activeVisualIdx > idx;
                        const isActive = activeVisualIdx === idx;

                        return (
                            <div key={vs.id} className="relative z-10 flex flex-col items-center gap-3 capitalize">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                                    isCompleted ? "bg-blue-500 border-blue-500 text-white" : 
                                    isActive ? "bg-white border-zinc-600 text-zinc-600 shadow-lg scale-110" : 
                                    "bg-white border-zinc-200 text-zinc-400"
                                )}>
                                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <span className={cn(
                                    "text-[11px] font-bold uppercase tracking-widest",
                                    isActive ? "text-zinc-600" : "text-zinc-400"
                                )}>
                                    {vs.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <Card className="border-none shadow-2xl shadow-zinc-200/60 overflow-hidden ring-1 ring-zinc-200/50 bg-white">
                    <CardContent className="p-10">
                        {renderStepContent()}
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">
                    QuickApp • v1.0
                </p>
            </div>
        </div>
    );
}