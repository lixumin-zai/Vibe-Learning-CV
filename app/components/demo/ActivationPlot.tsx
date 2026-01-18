"use client";
import { useState, useMemo } from 'react';

const FUNCTIONS = {
    ReLU: (x: number) => Math.max(0, x),
    Sigmoid: (x: number) => 1 / (1 + Math.exp(-x)),
    Tanh: (x: number) => Math.tanh(x),
    LeakyReLU: (x: number) => Math.max(0.1 * x, x),
};

export function ActivationPlot() {
    const [activeFunc, setActiveFunc] = useState<keyof typeof FUNCTIONS>('ReLU');
    const [inputValue, setInputValue] = useState(0);

    const points = useMemo(() => {
        const fn = FUNCTIONS[activeFunc];
        const data = [];
        for (let x = -5; x <= 5; x += 0.2) {
            data.push({ x, y: fn(x) });
        }
        return data;
    }, [activeFunc]);

    const outputValue = FUNCTIONS[activeFunc](inputValue);

    // Simple SVG plotting logic
    // Map x: [-5, 5] -> [0, 300]
    // Map y: [-2, 2] -> [200, 0] (roughly)

    const mapX = (x: number) => (x + 5) * (300 / 10);
    const mapY = (y: number) => 200 - (y + 1) * (200 / 4); // Center visually around y=0

    const pathD = `M ${points.map(p => `${mapX(p.x)},${mapY(p.y)}`).join(' L ')}`;

    return (
        <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold font-sans mb-2">Activation Functions</h3>
                        <div className="flex flex-wrap gap-2">
                            {(Object.keys(FUNCTIONS) as Array<keyof typeof FUNCTIONS>).map((fn) => (
                                <button
                                    key={fn}
                                    onClick={() => setActiveFunc(fn)}
                                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${activeFunc === fn
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                >
                                    {fn}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                        <div className="flex justify-between text-sm">
                            <span>Input (x): <span className="font-mono font-bold">{inputValue.toFixed(2)}</span></span>
                            <span>Output (y): <span className="font-mono font-bold text-primary">{outputValue.toFixed(4)}</span></span>
                        </div>
                        <input
                            type="range" min="-5" max="5" step="0.1"
                            value={inputValue}
                            onChange={(e) => setInputValue(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>

                <div className="w-full md:w-[300px] h-[200px] bg-background border border-border rounded-lg relative overflow-hidden">
                    <svg width="300" height="200" className="absolute inset-0">
                        {/* Grid lines */}
                        <line x1="0" y1={mapY(0)} x2="300" y2={mapY(0)} stroke="currentColor" strokeOpacity="0.1" />
                        <line x1={mapX(0)} y1="0" x2={mapX(0)} y2="200" stroke="currentColor" strokeOpacity="0.1" />

                        {/* Function Curve */}
                        <path d={pathD} fill="none" stroke="var(--color-fd-primary)" strokeWidth="3" />

                        {/* Active Point */}
                        <circle
                            cx={mapX(inputValue)}
                            cy={mapY(outputValue)}
                            r="6"
                            fill="var(--color-fd-primary)"
                            stroke="var(--color-fd-background)"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
