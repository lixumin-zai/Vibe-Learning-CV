'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export function NeighborhoodDemo() {
  const [center, setCenter] = useState<{ u: number; v: number }>({ u: 4, v: 4 });
  const [mode, setMode] = useState<'4' | '8'>('4');
  const size = 9;

  const isNeighbor = (u: number, v: number) => {
    const du = Math.abs(u - center.u);
    const dv = Math.abs(v - center.v);
    const dist = du + dv;
    
    if (du === 0 && dv === 0) return false; // Center
    if (mode === '4') return dist === 1;
    if (mode === '8') return Math.max(du, dv) === 1;
    return false;
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Pixel Connectivity</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('4')}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-colors border",
              mode === '4' ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80 border-transparent"
            )}
          >
            4-Neighbors
          </button>
          <button
            onClick={() => setMode('8')}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-colors border",
              mode === '8' ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80 border-transparent"
            )}
          >
            8-Neighbors
          </button>
        </div>
      </div>

      <div className="relative self-center">
        <div 
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: size * size }).map((_, i) => {
            const u = i % size;
            const v = Math.floor(i / size);
            const isCenter = center.u === u && center.v === v;
            const neighbor = isNeighbor(u, v);

            return (
              <motion.div
                key={i}
                className={cn(
                  "w-8 h-8 border rounded flex items-center justify-center text-[10px] cursor-pointer transition-colors select-none",
                  isCenter ? "bg-blue-500 text-white border-blue-600" : 
                  neighbor ? "bg-green-500/50 border-green-500 text-green-900 dark:text-green-100" : 
                  "bg-muted/20 border-border hover:bg-muted"
                )}
                onClick={() => setCenter({ u, v })}
                whileHover={{ scale: 1.05 }}
              >
                {isCenter ? 'P' : neighbor ? 'N' : ''}
              </motion.div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Click any pixel to set it as the center (P). Neighbors (N) are highlighted based on the selected mode.
      </p>
    </div>
  );
}
