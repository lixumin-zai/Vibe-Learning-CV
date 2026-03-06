'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export function RGBMixingDemo() {
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-xl bg-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">RGB Additive Mixing</h3>
        <div 
          className="w-12 h-12 rounded-full border shadow-sm"
          style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span>Red</span>
            <span>{red}</span>
          </div>
          <input 
            type="range" min="0" max="255" value={red} 
            onChange={(e) => setRed(Number(e.target.value))}
            className="w-full accent-red-500 h-2 bg-red-100 rounded-lg appearance-none cursor-pointer dark:bg-red-900/30"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span>Green</span>
            <span>{green}</span>
          </div>
          <input 
            type="range" min="0" max="255" value={green} 
            onChange={(e) => setGreen(Number(e.target.value))}
            className="w-full accent-green-500 h-2 bg-green-100 rounded-lg appearance-none cursor-pointer dark:bg-green-900/30"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span>Blue</span>
            <span>{blue}</span>
          </div>
          <input 
            type="range" min="0" max="255" value={blue} 
            onChange={(e) => setBlue(Number(e.target.value))}
            className="w-full accent-blue-500 h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer dark:bg-blue-900/30"
          />
        </div>
      </div>

      <div className="relative h-32 mt-4 flex justify-center items-center isolate">
        <div className="absolute w-24 h-24 rounded-full bg-red-500 mix-blend-screen translate-x-[-30%] translate-y-[-10%]" />
        <div className="absolute w-24 h-24 rounded-full bg-green-500 mix-blend-screen translate-x-[30%] translate-y-[-10%]" />
        <div className="absolute w-24 h-24 rounded-full bg-blue-500 mix-blend-screen translate-y-[40%]" />
        <div className="absolute top-0 text-[10px] text-muted-foreground w-full text-center mt-32">
          Overlapping regions show Cyan, Magenta, Yellow, and White.
        </div>
      </div>
    </div>
  );
}
