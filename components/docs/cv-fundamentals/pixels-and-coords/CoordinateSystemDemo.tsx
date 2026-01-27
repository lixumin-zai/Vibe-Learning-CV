'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export function CoordinateSystemDemo() {
  const [hovered, setHovered] = useState<{ u: number; v: number } | null>(null);
  const size = 10;

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Pixel Coordinate System (u, v)</h3>
        <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
          {hovered ? `u: ${hovered.u}, v: ${hovered.v}` : 'Hover a pixel'}
        </div>
      </div>

      <div className="relative self-center mt-6 ml-6">
        {/* Axes Labels */}
        <div className="absolute -top-6 left-0 w-full flex justify-center text-sm text-muted-foreground font-mono">
          u (columns) →
        </div>
        <div className="absolute -left-8 top-0 h-full flex items-center text-sm text-muted-foreground font-mono" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          v (rows) ↓
        </div>

        {/* Grid */}
        <div 
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: size * size }).map((_, i) => {
            const u = i % size;
            const v = Math.floor(i / size);
            const isHovered = hovered?.u === u && hovered?.v === v;

            return (
              <motion.div
                key={i}
                className={cn(
                  "w-8 h-8 border rounded flex items-center justify-center text-[10px] cursor-crosshair transition-colors select-none",
                  isHovered ? "bg-primary text-primary-foreground border-primary" : "bg-muted/20 border-border hover:bg-muted"
                )}
                onMouseEnter={() => setHovered({ u, v })}
                onMouseLeave={() => setHovered(null)}
              >
                {isHovered && `${u},${v}`}
              </motion.div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        In image processing, the origin (0,0) is typically at the top-left corner. 
        <strong>u</strong> increases to the right, and <strong>v</strong> increases downwards.
      </p>
    </div>
  );
}
