'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

export function GrayscaleComparison() {
  // A simple representation of a "pixel" with RGB values
  const [pixel, setPixel] = useState({ r: 50, g: 150, b: 250 });

  const average = Math.round((pixel.r + pixel.g + pixel.b) / 3);
  // Human eye is more sensitive to Green, then Red, then Blue
  const weighted = Math.round(0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b);

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card">
      <h3 className="font-semibold">Grayscale Conversion Methods</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Input Color */}
        <div className="flex flex-col items-center gap-3">
          <div 
            className="w-24 h-24 rounded-lg border shadow-sm transition-colors"
            style={{ backgroundColor: `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})` }}
          />
          <div className="text-sm font-medium">Original Color</div>
          <div className="flex flex-col gap-2 w-full px-4">
             <label className="flex justify-between text-xs"><span>R</span> <span>{pixel.r}</span></label>
             <input type="range" min="0" max="255" value={pixel.r} onChange={(e) => setPixel({...pixel, r: Number(e.target.value)})} className="h-1 accent-red-500" />
             
             <label className="flex justify-between text-xs"><span>G</span> <span>{pixel.g}</span></label>
             <input type="range" min="0" max="255" value={pixel.g} onChange={(e) => setPixel({...pixel, g: Number(e.target.value)})} className="h-1 accent-green-500" />
             
             <label className="flex justify-between text-xs"><span>B</span> <span>{pixel.b}</span></label>
             <input type="range" min="0" max="255" value={pixel.b} onChange={(e) => setPixel({...pixel, b: Number(e.target.value)})} className="h-1 accent-blue-500" />
          </div>
        </div>

        {/* Average Method */}
        <div className="flex flex-col items-center gap-3">
          <div 
            className="w-24 h-24 rounded-lg border shadow-sm transition-colors"
            style={{ backgroundColor: `rgb(${average}, ${average}, ${average})` }}
          />
          <div className="text-sm font-medium">Average Method</div>
          <div className="text-xs text-muted-foreground text-center">
            (R + G + B) / 3
          </div>
          <div className="font-mono text-xl font-bold">{average}</div>
        </div>

        {/* Weighted Method */}
        <div className="flex flex-col items-center gap-3">
          <div 
            className="w-24 h-24 rounded-lg border shadow-sm transition-colors"
            style={{ backgroundColor: `rgb(${weighted}, ${weighted}, ${weighted})` }}
          />
          <div className="text-sm font-medium">Weighted (Luma)</div>
          <div className="text-xs text-muted-foreground text-center">
            0.299R + 0.587G + 0.114B
          </div>
          <div className="font-mono text-xl font-bold">{weighted}</div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        Notice how the weighted method produces a brightness that better matches human perception, especially when Green is dominant.
      </p>
    </div>
  );
}
