"use client";

import { useState, useRef, useEffect } from 'react';

export function QuantizationDemo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [bits, setBits] = useState(8); // 1 bit to 8 bits

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        
        // Clear
        ctx.clearRect(0, 0, w, h);

        // Calculate levels
        const levels = Math.pow(2, bits);
        const step = 255 / (levels - 1);

        // Draw a gradient
        const gradientData = ctx.createImageData(w, h);
        const data = gradientData.data;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                // Generate a smooth gradient value (0-255) based on x position
                // Combine with a radial gradient for more complexity
                const centerX = w / 2;
                const centerY = h / 2;
                const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                const maxDist = Math.sqrt((w/2)**2 + (h/2)**2);
                
                // Base value from linear gradient + radial
                let val = ((x / w) * 128) + ((1 - dist / maxDist) * 127);
                
                // Quantize
                // Normalize to 0-1, floor to level, scale back
                if (levels > 1) {
                    val = Math.floor(val / 255 * (levels - 1)) * (255 / (levels - 1));
                } else {
                    val = val > 127 ? 255 : 0; // 1 bit case
                }

                const index = (y * w + x) * 4;
                data[index] = val;     // R
                data[index + 1] = val; // G
                data[index + 2] = val; // B
                data[index + 3] = 255; // A
            }
        }

        ctx.putImageData(gradientData, 0, 0);

    }, [bits]);

    return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm my-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-primary rounded-full"/>
                灰度级分辨率 / 量化 (Quantization)
            </h3>
            
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-black/5 rounded-lg overflow-hidden flex items-center justify-center min-h-[300px] border border-border/50">
                    <canvas 
                        ref={canvasRef} 
                        width={400} 
                        height={300}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="w-full md:w-64 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex justify-between">
                            位深 (Bit Depth)
                            <span className="font-mono text-primary">{bits} bits</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="8"
                            step="1"
                            value={bits}
                            onChange={(e) => setBits(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            降低位深会减少可用的灰度级数，导致平滑区域出现明显的"伪轮廓" (False Contouring)。
                        </p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg text-sm space-y-2">
                        <div className="flex justify-between">
                            <span>灰度级数:</span>
                            <span className="font-mono text-primary">{Math.pow(2, bits)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>每个等级跨度:</span>
                            <span className="font-mono">{(255 / (Math.pow(2, bits) - 1)).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
