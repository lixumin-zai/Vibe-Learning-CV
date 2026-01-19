"use client";
import { useState, useRef, useEffect } from 'react';

export function ImageProcessor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [grayscale, setGrayscale] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw placeholder pattern
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(0, 0, 400, 300);

        // Draw some shapes
        ctx.fillStyle = '#007AFF';
        ctx.beginPath();
        ctx.arc(200, 150, 50, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff3b30';
        ctx.fillRect(50, 50, 80, 80);

        ctx.fillStyle = '#34c759';
        ctx.beginPath();
        ctx.moveTo(300, 200);
        ctx.lineTo(350, 280);
        ctx.lineTo(250, 280);
        ctx.fill();

    }, []);

    const filterStyle = {
        filter: `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`
    };

    return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative overflow-hidden rounded-lg bg-black/5 flex items-center justify-center min-h-[300px]">
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={300}
                        className="w-full h-full object-contain transition-all duration-200"
                        style={filterStyle}
                    />
                </div>

                <div className="w-full md:w-64 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex justify-between">
                            Brightness <span>{brightness}%</span>
                        </label>
                        <input
                            type="range" min="0" max="200" value={brightness}
                            onChange={(e) => setBrightness(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex justify-between">
                            Contrast <span>{contrast}%</span>
                        </label>
                        <input
                            type="range" min="0" max="200" value={contrast}
                            onChange={(e) => setContrast(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex justify-between">
                            Grayscale <span>{grayscale}%</span>
                        </label>
                        <input
                            type="range" min="0" max="100" value={grayscale}
                            onChange={(e) => setGrayscale(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    <button
                        onClick={() => { setBrightness(100); setContrast(100); setGrayscale(0); }}
                        className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity text-sm font-medium"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
