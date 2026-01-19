"use client";
import { useState } from 'react';

const SNIPPETS = {
    PyTorch: `import torch
import torch.nn as nn

# Define a simple CNN
class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, 3)
        self.pool = nn.MaxPool2d(2, 2)
        
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        return x

model = SimpleCNN()
print(model)`,
    OpenCV: `import cv2
import numpy as np

# Load image
img = cv2.imread('image.jpg')

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Edge detection
edges = cv2.Canny(gray, 100, 200)

print(f"Edges shape: {edges.shape}")`,
    TensorFlow: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, (3,3), activation='relu'),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(10)
])

model.summary()`
};

export function CodeTerminal() {
    const [language, setLanguage] = useState<keyof typeof SNIPPETS>('PyTorch');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const runCode = () => {
        setIsRunning(true);
        setOutput('');
        setTimeout(() => {
            setIsRunning(false);
            setOutput(`> Executing ${language} script...\n> Loaded libraries successfully.\n> Process completed (Simulated output).`);
        }, 1500);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-border shadow-sm flex flex-col font-mono text-sm max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-muted px-4 py-2 flex items-center justify-between border-b border-border">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex gap-2">
                    {(Object.keys(SNIPPETS) as Array<keyof typeof SNIPPETS>).map(lang => (
                        <button
                            key={lang}
                            onClick={() => { setLanguage(lang); setOutput(''); }}
                            className={`px-3 py-1 rounded text-xs transition-colors ${language === lang ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            {/* Code Area */}
            <div className="bg-[#1e1e1e] text-gray-300 p-6 overflow-x-auto min-h-[200px]">
                <pre>{SNIPPETS[language]}</pre>
            </div>

            {/* Output Area */}
            <div className="bg-black text-white p-4 border-t border-gray-800 h-[100px] relative">
                <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="absolute top-[-20px] right-4 bg-primary hover:bg-primary/90 text-white px-4 py-1 rounded shadow-lg text-xs font-sans transition-all active:scale-95 disabled:opacity-50"
                >
                    {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <div className="font-mono text-xs opacity-80 whitespace-pre-wrap">
                    {output || '> Ready to execute...'}
                </div>
            </div>
        </div>
    );
}
