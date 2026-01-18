"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
    { id: 1, title: 'Basics', description: 'Pixels, Colors, Image operations', completed: true },
    { id: 2, title: 'Processing', description: 'Filters, Edge Detection, Morphology', completed: true },
    { id: 3, title: 'Features', description: 'Corners, Blobs, SIFT/ORB', completed: false },
    { id: 4, title: 'Deep Learning', description: 'CNNs, Transfer Learning', completed: false },
    { id: 5, title: 'Advanced', description: 'Transformers, GANs, Diffusion', completed: false },
];

export function LearningPath() {
    const [activeStep, setActiveStep] = useState(3);

    return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <h3 className="text-xl font-bold mb-6 font-sans">Learning Roadmap</h3>
            <div className="relative">
                {/* Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-secondary" />

                <div className="space-y-8">
                    {steps.map((step) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative pl-12"
                        >
                            <button
                                onClick={() => setActiveStep(step.id)}
                                className={`absolute left-2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-colors duration-300 z-10 
                  ${step.id <= activeStep ? 'bg-primary border-primary' : 'bg-background border-secondary'}`}
                            />
                            <div
                                className={`p-4 rounded-lg transition-colors cursor-pointer border ${step.id === activeStep
                                        ? 'bg-primary/5 border-primary'
                                        : 'bg-background hover:bg-muted/50 border-border'
                                    }`}
                                onClick={() => setActiveStep(step.id)}
                            >
                                <h4 className={`font-semibold ${step.id === activeStep ? 'text-primary' : 'text-foreground'}`}>
                                    {step.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
