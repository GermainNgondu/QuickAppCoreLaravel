import React, { useState } from 'react';
import { Button } from "@ui";
import { SchemaRenderer } from "@shared";

export function Wizard({ steps }) {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className="space-y-6">
            {/* Indicateur de progression */}
            <div className="flex justify-between border-b pb-4">
                {steps.map((step, index) => (
                    <div key={step.key} className={index <= currentStep ? "text-primary font-bold" : "text-muted-foreground"}>
                        {index + 1}. {step.title}
                    </div>
                ))}
            </div>

            {/* Contenu de l'étape */}
            <div className="py-4">
                <SchemaRenderer schema={steps[currentStep].schema} />
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>Précédent</Button>
                {currentStep < steps.length - 1 ? (
                    <Button onClick={() => setCurrentStep(currentStep + 1)}>Suivant</Button>
                ) : (
                    <Button variant="default">Terminer</Button>
                )}
            </div>
        </div>
    );
}