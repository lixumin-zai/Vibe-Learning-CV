"use client";
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExcalidrawCanvas } from './ExcalidrawCanvas';
import { Maximize2, X } from 'lucide-react';

export function ExcalidrawModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group relative flex items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/5 hover:bg-muted/10 hover:border-primary/50 transition-all duration-300"
            >
                <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary">
                    <div className="p-3 rounded-full bg-background shadow-sm border border-border group-hover:scale-110 transition-transform">
                        <Maximize2 className="w-6 h-6" />
                    </div>
                    <span className="font-medium">Open Mind Map Whiteboard</span>
                </div>
            </button>

            {isOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="relative w-full h-full max-w-[95vw] max-h-[90vh] bg-background rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                Whiteboard
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Canvas Container */}
                        <div className="flex-1 relative bg-white">
                            <ExcalidrawCanvas className="w-full h-full" />
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
