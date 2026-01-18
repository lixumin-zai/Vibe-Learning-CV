"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export function SamplingDemo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [resolution, setResolution] = useState(100); // 1% to 100%

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Disable image smoothing to show pixelation clearly
        ctx.imageSmoothingEnabled = false;

        // Draw the "original" high-res scene to an offscreen canvas or just draw scaled
        // For simulation, we draw small and scale up
        
        const w = canvas.width;
        const h = canvas.height;
        
        // Calculate logical resolution
        const logicalW = Math.max(4, Math.floor(w * (resolution / 100)));
        const logicalH = Math.max(3, Math.floor(h * (resolution / 100)));
        
        // Create a temporary canvas for the low-res rendering
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = logicalW;
        tempCanvas.height = logicalH;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        // Draw scene on temp canvas (Low Res)
        // Background
        tempCtx.fillStyle = '#1a1a1a';
        tempCtx.fillRect(0, 0, logicalW, logicalH);
        
        // Circle
        tempCtx.fillStyle = '#3b82f6';
        tempCtx.beginPath();
        tempCtx.arc(logicalW / 2, logicalH / 2, logicalH / 3, 0, Math.PI * 2);
        tempCtx.fill();
        
        // Triangle
        tempCtx.fillStyle = '#ef4444';
        tempCtx.beginPath();
        tempCtx.moveTo(logicalW * 0.2, logicalH * 0.8);
        tempCtx.lineTo(logicalW * 0.35, logicalH * 0.4);
        tempCtx.lineTo(logicalW * 0.5, logicalH * 0.8);
        tempCtx.fill();

        // Text
        tempCtx.fillStyle = '#ffffff';
        tempCtx.font = `${Math.max(10, logicalH / 5)}px sans-serif`;
        tempCtx.textAlign = 'center';
        tempCtx.fillText('CV', logicalW * 0.8, logicalH * 0.3);

        // Draw back to main canvas, scaled up
        ctx.drawImage(tempCanvas, 0, 0, logicalW, logicalH, 0, 0, w, h);

        // Draw grid lines if resolution is low enough to see individual pixels clearly
        if (resolution < 20) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            const pixelW = w / logicalW;
            const pixelH = h / logicalH;

            ctx.beginPath();
            for (let x = 0; x <= w; x += pixelW) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
            }
            for (let y = 0; y <= h; y += pixelH) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
            ctx.stroke();
        }

    }, [resolution]);

    return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm my-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-primary rounded-full"/>
                空间分辨率 (Spatial Resolution)
            </h3>
            
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-black/5 rounded-lg overflow-hidden flex items-center justify-center min-h-[300px] border border-border/50">
                    <canvas 
                        ref={canvasRef} 
                        width={400} 
                        height={300}
                        className="w-full h-full object-contain rendering-pixelated"
                        style={{ imageRendering: 'pixelated' }} 
                    />
                </div>

                <div className="w-full md:w-64 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex justify-between">
                            采样率 / 分辨率
                            <span className="font-mono text-primary">{resolution}%</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            value={resolution}
                            onChange={(e) => setResolution(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            向左滑动降低采样率，观察图像细节丢失和"马赛克"现象。
                        </p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-2">
                        <div className="flex justify-between">
                            <span>原始尺寸:</span>
                            <span className="font-mono">400 x 300</span>
                        </div>
                        <div className="flex justify-between">
                            <span>当前采样:</span>
                            <span className="font-mono text-primary">
                                {Math.max(4, Math.floor(400 * (resolution / 100)))} x {Math.max(3, Math.floor(300 * (resolution / 100)))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
