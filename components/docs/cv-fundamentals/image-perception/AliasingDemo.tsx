"use client";

import { useState, useRef, useEffect } from 'react';

export function AliasingDemo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [signalFreq, setSignalFreq] = useState(10); // Frequency of the pattern
    const [samplingRate, setSamplingRate] = useState(100); // Sampling pixels width

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        
        // Clear
        ctx.clearRect(0, 0, w, h);

        // Draw the "analog" signal (Continuous)
        // Represented by high-res drawing
        ctx.strokeStyle = '#3b82f6'; // Blue for original
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
            const y = h/2 + Math.sin((x / w) * signalFreq * Math.PI * 2) * (h/3);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw samples
        // Sampling interval in pixels
        const interval = w / samplingRate;
        
        ctx.fillStyle = '#ef4444'; // Red for samples
        for (let i = 0; i <= samplingRate; i++) {
            const x = i * interval;
            const y = h/2 + Math.sin((x / w) * signalFreq * Math.PI * 2) * (h/3);
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw reconstructed signal (linear interpolation between samples)
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)'; // Red transparent
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= samplingRate; i++) {
            const x = i * interval;
            const y = h/2 + Math.sin((x / w) * signalFreq * Math.PI * 2) * (h/3);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

    }, [signalFreq, samplingRate]);

    const nyquistRate = signalFreq * 2;
    const isAliased = samplingRate < nyquistRate;

    return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm my-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-primary rounded-full"/>
                奈奎斯特采样与混叠 (Aliasing)
            </h3>
            
            <div className="flex flex-col gap-6">
                <div className="bg-black/5 rounded-lg overflow-hidden relative h-[200px] border border-border/50">
                    <canvas 
                        ref={canvasRef} 
                        width={600} 
                        height={200}
                        className="w-full h-full"
                    />
                    <div className="absolute top-2 right-2 text-xs font-mono space-y-1 bg-card/80 p-2 rounded border border-border">
                        <div className="text-blue-500">── 原始信号 (模拟)</div>
                        <div className="text-red-500">●- 采样点与重建</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex justify-between">
                            信号频率
                            <span className="font-mono text-blue-500">{signalFreq} Hz</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            step="1"
                            value={signalFreq}
                            onChange={(e) => setSignalFreq(Number(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex justify-between">
                            采样率
                            <span className="font-mono text-red-500">{samplingRate} Hz</span>
                        </label>
                        <input
                            type="range"
                            min="2"
                            max="100"
                            step="1"
                            value={samplingRate}
                            onChange={(e) => setSamplingRate(Number(e.target.value))}
                            className="w-full accent-red-500"
                        />
                    </div>
                </div>

                <div className={`p-4 rounded-lg border ${isAliased ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm">状态检测:</span>
                        <span className={`text-sm font-bold ${isAliased ? 'text-red-600' : 'text-green-600'}`}>
                            {isAliased ? '发生混叠 (Aliasing)' : '正常采样 (OK)'}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        奈奎斯特频率要求采样率至少为信号频率的 2 倍 ({nyquistRate} Hz)。
                        <br/>
                        当前：{samplingRate} Hz {isAliased ? '<' : '>='} {nyquistRate} Hz
                    </p>
                </div>
            </div>
        </div>
    );
}
