import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Link } from 'react-router';
import { baseOptions } from '@/lib/layout.shared';
import { motion } from 'framer-motion';
import { RootProvider } from 'fumadocs-ui/provider/react-router';

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
    border: 'group-hover:border-blue-500/50'
  },
  {
    title: 'Deep Learning',
    desc: 'CNNs, Transformers, and modern architectures.',
    href: '/docs/deep-learning',
    gradient: 'from-purple-500/20 to-purple-500/5',
    border: 'group-hover:border-purple-500/50'
  },
  {
    title: 'Projects',
    desc: 'Real-world applications and experiments.',
    href: '/docs/projects',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'group-hover:border-emerald-500/50'
  },
  {
    title: 'Tools',
    desc: 'OpenCV, PyTorch, and essential libraries.',
    href: '/docs/tools',
    gradient: 'from-orange-500/20 to-orange-500/5',
    border: 'group-hover:border-orange-500/50'
  },
  {
    title: 'Models',
    desc: 'YOLO, ResNet, ViT, and more.',
    href: '/docs/models',
    gradient: 'from-pink-500/20 to-pink-500/5',
    border: 'group-hover:border-pink-500/50'
  }
];

export default function Home() {
  return (
    <RootProvider>
      <HomeLayout {...baseOptions()}>
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center py-24 px-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Computer Vision Tutorial
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                From <span className="text-primary font-medium">Pixels</span> to <span className="text-primary font-medium">Transformers</span>.
                <br />
                A pragmatic journey into Machine Perception.
              </p>

              <div className="flex gap-4 justify-center pt-8">
                <Link
                  to="/docs"
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
                >
                  Start Learning
                </Link>
                <Link
                  to="/docs/tools/interactive-demos"
                  className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-all"
                >
                  Interactive Demos
                </Link>
              </div>
            </motion.div>
          </section>

          {/* Modules Grid */}
          <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-10 text-center md:text-left text-muted-foreground uppercase tracking-widest text-sm">
              Curriculum Modules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULES.map((mod, i) => (
                <Link to={mod.href} key={mod.title} className="group">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`h-full p-8 rounded-2xl border border-border bg-gradient-to-br ${mod.gradient} backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl ${mod.border}`}
                  >
                    <h3 className="text-2xl font-bold mb-3">{mod.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {mod.desc}
                    </p>
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
