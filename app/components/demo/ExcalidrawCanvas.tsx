"use client";
import { useState, useEffect } from 'react';
import "@excalidraw/excalidraw/index.css";

export function ExcalidrawCanvas({ className = "h-[600px] w-full", initialData }: { className?: string, initialData?: any }) {
    const [Excalidraw, setExcalidraw] = useState<any>(null);

    useEffect(() => {
        import('@excalidraw/excalidraw').then((mod) => {
            setExcalidraw(() => mod.Excalidraw);
        });
    }, []);

    if (!Excalidraw) {
        return (
            <div className={`${className} bg-muted/20 animate-pulse rounded-xl border border-border flex items-center justify-center text-muted-foreground`}>
                Loading Excalidraw...
            </div>
        );
    }

    return (
        <div className={`${className} border border-border rounded-xl overflow-hidden shadow-sm`}>
            <Excalidraw 
                theme="light"
                initialData={initialData || {
                    appState: {
                        viewBackgroundColor: "#ffffff",
                        currentItemFontFamily: 1,
                    }
                }}
            />
        </div>
    );
}
