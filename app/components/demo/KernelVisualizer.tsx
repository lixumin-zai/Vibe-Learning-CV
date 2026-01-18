"use client";
import { useState } from 'react';

const KERNELS = {
    Sharpen: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ],
    Edge: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1]
    ],
    BoxBlur: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
};

export function KernelVisualizer() {
    const [selectedKernel, setSelectedKernel] = useState<keyof typeof KERNELS>('Edge');

    const kernel = KERNELS[selectedKernel];

    return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                    <h3 className="text-lg font-semibold font-sans">Convolution Kernel</h3>
                    <p className="text-sm text-muted-foreground">
                        Visual representation of a 3x3 filter matrix used for image processing operations like edge detection or blurring.
                    </p>

                    <div className="flex gap-2">
                        {(Object.keys(KERNELS) as Array<keyof typeof KERNELS>).map((k) => (
                            <button
                                key={k}
                                onClick={() => setSelectedKernel(k)}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedKernel === k
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                    }`}
                            >
                                {k}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-4 bg-muted/20 rounded-lg">
                    {kernel.map((row, i) => (
                        row.map((val, j) => (
                            <div
                                key={`${i}-${j}`}
                                className="w-16 h-16 flex items-center justify-center bg-background border border-border rounded shadow-sm text-xl font-mono font-bold transition-all duration-300 transform hover:scale-105"
                            >
                                {val}
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}
