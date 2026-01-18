import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Link } from 'react-router';
import { baseOptions } from '@/lib/layout.shared';
import { motion } from 'framer-motion';
import { RootProvider } from 'fumadocs-ui/provider/react-router';
import { ScanEye, Brain, Rocket, Wrench, Box, ArrowRight, Sparkles } from 'lucide-react';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'Computer Vision Tutorial' },
    { name: 'description', content: 'A comprehensive guide to Computer Vision and Deep Learning.' },
  ];
}

const MODULES = [
  {
    title: 'Fundamentals',
    desc: 'Image processing, geometry, and filtering.',
    href: '/docs/cv-fundamentals',
    gradient: 'from-blue-500/20 to-blue-500/5',
    border: 'group-hover:border-blue-500/50',
    icon: <ScanEye className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Deep Learning',
    desc: 'CNNs, Transformers, and modern architectures.',
    href: '/docs/deep-learning',
    gradient: 'from-purple-500/20 to-purple-500/5',
    border: 'group-hover:border-purple-500/50',
    icon: <Brain className="w-8 h-8 text-purple-500" />
  },
  {
    title: 'Projects',
    desc: 'Real-world applications and experiments.',
    href: '/docs/projects',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'group-hover:border-emerald-500/50',
    icon: <Rocket className="w-8 h-8 text-emerald-500" />
  },
  {
    title: 'Tools',
    desc: 'OpenCV, PyTorch, and essential libraries.',
    href: '/docs/tools',
    gradient: 'from-orange-500/20 to-orange-500/5',
    border: 'group-hover:border-orange-500/50',
    icon: <Wrench className="w-8 h-8 text-orange-500" />
  },
  {
    title: 'Models',
    desc: 'YOLO, ResNet, ViT, and more.',
    href: '/docs/models',
    gradient: 'from-pink-500/20 to-pink-500/5',
    border: 'group-hover:border-pink-500/50',
    icon: <Box className="w-8 h-8 text-pink-500" />
  }
];

export default function Home() {
  return (
    <RootProvider>
      <HomeLayout {...baseOptions()}>
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center relative overflow-hidden min-h-[60vh]">
            {/* Grid Background */}
            <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
            </div>
            
            {/* Floating Code Snippets */}
            <motion.div 
              className="absolute top-1/4 right-[5%] lg:right-[15%] -z-10 opacity-70 hidden md:block"
              animate={{ y: [0, -15, 0], rotate: [6, 10, 6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-xs font-mono bg-card/30 backdrop-blur-md p-4 rounded-xl border border-border/50 text-blue-500 shadow-lg">
                <div className="flex gap-1.5 mb-3 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-red-500"/>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                  <div className="w-2 h-2 rounded-full bg-green-500"/>
                </div>
                <pre>{`import torch
import torch.nn as nn

results = model('img.jpg')`}</pre>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-1/4 left-[5%] lg:left-[15%] -z-10 opacity-70 hidden md:block"
              animate={{ y: [0, 15, 0], rotate: [-6, -10, -6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-xs font-mono bg-card/30 backdrop-blur-md p-4 rounded-xl border border-border/50 text-emerald-500 shadow-lg">
                <div className="flex gap-1.5 mb-3 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-red-500"/>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                  <div className="w-2 h-2 rounded-full bg-green-500"/>
                </div>
                <pre>{`import cv2
img = cv2.imread('data.jpg')
gray = cv2.cvtColor(img, 
    cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 100, 200)`}</pre>
              </div>
            </motion.div>
            
            {/* Dynamic Gradient Blobs */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen"
            />

            {/* Scanning Line Effect */}
            <motion.div
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10 blur-[1px]"
            />
            
            {/* Camera Viewfinder Elements */}
            <div className="absolute inset-4 md:inset-10 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-foreground rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-foreground rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-foreground rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-foreground rounded-br-3xl" />
                
                {/* Crosshairs */}
                <div className="absolute top-1/2 left-4 w-4 h-[2px] bg-foreground" />
                <div className="absolute top-1/2 right-4 w-4 h-[2px] bg-foreground" />
                <div className="absolute left-1/2 top-4 w-[2px] h-4 bg-foreground" />
                <div className="absolute left-1/2 bottom-4 w-[2px] h-4 bg-foreground" />
            </div>

            <motion.div 
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" 
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl space-y-8 z-10 relative"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border backdrop-blur-sm text-sm text-muted-foreground mb-4"
              >
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>Interactive Learning</span>
              </motion.div>

              {/* Hero Visual Animation */}
              <div className="relative w-full max-w-[280px] md:max-w-md mx-auto h-32 md:h-40 flex items-center justify-center my-8">
                {/* Abstract Neural Grid */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                   <div className="w-48 h-24 md:w-64 md:h-32 border border-primary/20 rounded-lg skew-x-12" />
                   <div className="absolute w-40 h-20 md:w-60 md:h-28 border border-secondary/20 rounded-lg -skew-x-12" />
                </div>

                {/* Central Pulse */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-full blur-2xl"
                />

                {/* Rotating Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-28 h-28 md:w-32 md:h-32 border-2 border-dashed border-primary/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-20 h-20 md:w-24 md:h-24 border border-dotted border-primary/40 rounded-full"
                />

                {/* Main Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 bg-card/80 backdrop-blur-xl p-5 md:p-6 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10"
                >
                  <ScanEye className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                  
                  {/* Scanning Beam */}
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[2px] bg-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                  />
                </motion.div>
                
                {/* Floating Badges */}
                <motion.div
                   animate={{ y: [-5, 5, -5], x: [0, 5, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -right-4 md:-right-8 top-0 bg-background/80 backdrop-blur border border-border/50 px-2 py-1 rounded text-[10px] font-mono text-muted-foreground shadow-sm hidden md:block"
                >
                  Pillow
                </motion.div>
                <motion.div
                   animate={{ y: [5, -5, 5], x: [0, -5, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -left-4 md:-left-8 bottom-0 bg-background/80 backdrop-blur border border-border/50 px-2 py-1 rounded text-[10px] font-mono text-muted-foreground shadow-sm hidden md:block"
                >
                  OpenCV
                </motion.div>
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-20">
                  <motion.path 
                    d="M 50 50 L 100 80" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, 10] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path 
                    d="M 230 50 L 180 80" 
                    stroke="currentColor" 
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -10] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>

              {/* <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 font-sans">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block"
                >
                  Computer Vision
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="block"
                >
                  Tutorial
                </motion.span>
              </h1> */}
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
              >
                From <span className="text-primary font-medium">Pixels</span> to <span className="text-primary font-medium">Transformers</span>.
                <br />
                A pragmatic journey into Machine Perception.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-4 justify-center pt-8"
              >
                <Link to="/docs">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow flex items-center gap-2"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                    </div>
                  </motion.div>
                </Link>

                <Link to="/docs/tools/interactive-demos">
                  <motion.div
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-full bg-secondary/30 backdrop-blur-md border border-white/10 text-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    Interactive Demos
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* Modules Grid */}
          <section className="pt-12 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
            
            <h2 className="text-3xl font-bold mb-12 text-center md:text-left font-sans flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full" />
              Curriculum Modules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULES.map((mod, i) => (
                <Link to={mod.href} key={mod.title} className="group cursor-pointer block h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative h-full p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden ${mod.border}`}
                  >
                    {/* Gradient Blob */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                      className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${mod.gradient} rounded-full blur-3xl`} 
                    />
                    
                    <div className="relative z-10">
                      <div className="mb-6 p-3 w-fit rounded-2xl bg-secondary/50 group-hover:bg-primary/10 transition-colors duration-300">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {mod.icon}
                        </motion.div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 font-sans group-hover:text-primary transition-colors">{mod.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>

                    {/* Arrow icon appearing on hover */}
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </HomeLayout>
    </RootProvider>
  );
}
