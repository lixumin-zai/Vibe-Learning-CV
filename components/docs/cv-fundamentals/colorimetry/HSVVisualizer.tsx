'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function HSVVisualizer() {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [value, setValue] = useState(100);

  // Convert HSV to RGB for display
  const hsvToRgb = (h: number, s: number, v: number) => {
    s /= 100;
    v /= 100;
    let c = v * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = v - c;
    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  };

  const rgb = hsvToRgb(hue, saturation, value);

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">HSV Color Space</h3>
        <div 
          className="w-12 h-12 rounded-full border shadow-sm"
          style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span>Hue (Color Type)</span>
            <span>{hue}°</span>
          </div>
          <input 
            type="range" min="0" max="359" value={hue} 
            onChange={(e) => setHue(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
            }}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span>Saturation (Purity)</span>
            <span>{saturation}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={saturation} 
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted"
            style={{
                background: `linear-gradient(to right, #ffffff, hsl(${hue}, 100%, 50%))`
            }}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span>Value (Brightness)</span>
            <span>{value}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={value} 
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted"
            style={{
                background: `linear-gradient(to right, #000000, hsl(${hue}, ${saturation}%, 50%))`
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-muted-foreground font-mono mt-2">
        <div className="bg-muted/30 p-2 rounded">R: {rgb.r}</div>
        <div className="bg-muted/30 p-2 rounded">G: {rgb.g}</div>
        <div className="bg-muted/30 p-2 rounded">B: {rgb.b}</div>
      </div>
    </div>
  );
}
