'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export function DistanceMetricDemo() {
  const [p1, setP1] = useState<{ u: number; v: number }>({ u: 2, v: 2 });
  const [p2, setP2] = useState<{ u: number; v: number }>({ u: 7, v: 7 });
  const [selecting, setSelecting] = useState<'p1' | 'p2'>('p1');
  const size = 10;

  const getDistance = () => {
    const du = Math.abs(p1.u - p2.u);
    const dv = Math.abs(p1.v - p2.v);
    return {
      euclidean: Math.sqrt(du * du + dv * dv).toFixed(2),
      manhattan: du + dv,
      chessboard: Math.max(du, dv)
    };
  };

  const distances = getDistance();

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-xl bg-card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
          <div className="text-xs text-muted-foreground mb-1 font-medium">Euclidean (L2)</div>
          <div className="font-mono font-bold text-xl text-blue-600 dark:text-blue-400">{distances.euclidean}</div>
          <div className="text-[10px] text-muted-foreground mt-1 font-mono">√((x₁-x₂)² + (y₁-y₂)²)</div>
        </div>
        <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
          <div className="text-xs text-muted-foreground mb-1 font-medium">Manhattan (L1)</div>
          <div className="font-mono font-bold text-xl text-green-600 dark:text-green-400">{distances.manhattan}</div>
          <div className="text-[10px] text-muted-foreground mt-1 font-mono">|x₁-x₂| + |y₁-y₂|</div>
        </div>
        <div className="bg-muted/50 p-3 rounded-lg border border-border/50">
          <div className="text-xs text-muted-foreground mb-1 font-medium">Chessboard (L∞)</div>
          <div className="font-mono font-bold text-xl text-orange-600 dark:text-orange-400">{distances.chessboard}</div>
          <div className="text-[10px] text-muted-foreground mt-1 font-mono">max(|x₁-x₂|, |y₁-y₂|)</div>
        </div>
      </div>

      <div className="flex justify-center gap-4 text-sm">
        <button 
          onClick={() => setSelecting('p1')}
          className={cn(
            "px-4 py-2 rounded-full border transition-all flex items-center gap-2", 
            selecting === 'p1' 
              ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ring-2 ring-blue-500/20" 
              : "hover:bg-muted bg-card"
          )}
        >
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          Select Point 1
        </button>
        <button 
          onClick={() => setSelecting('p2')}
          className={cn(
            "px-4 py-2 rounded-full border transition-all flex items-center gap-2", 
            selecting === 'p2' 
              ? "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300 ring-2 ring-red-500/20" 
              : "hover:bg-muted bg-card"
          )}
        >
          <div className="w-2 h-2 rounded-full bg-red-500" />
          Select Point 2
        </button>
      </div>

      <div className="relative self-center">
        <div 
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: size * size }).map((_, i) => {
            const u = i % size;
            const v = Math.floor(i / size);
            const isP1 = p1.u === u && p1.v === v;
            const isP2 = p2.u === u && p2.v === v;

            return (
              <motion.div
                key={i}
                className={cn(
                  "w-8 h-8 border rounded flex items-center justify-center text-[10px] cursor-pointer transition-colors select-none",
                  isP1 ? "bg-blue-500 text-white border-blue-600 z-10 shadow-lg shadow-blue-500/20" :
                  isP2 ? "bg-red-500 text-white border-red-600 z-10 shadow-lg shadow-red-500/20" :
                  "bg-muted/20 border-border hover:bg-muted"
                )}
                onClick={() => {
                  if (selecting === 'p1') setP1({ u, v });
                  else setP2({ u, v });
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isP1 ? 'P1' : isP2 ? 'P2' : ''}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
