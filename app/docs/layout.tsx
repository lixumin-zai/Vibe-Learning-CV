import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { Book, Brain, Code, Cpu, Layers, Layout as LayoutIcon } from 'lucide-react';

const ROOTS = [
  {
    title: 'Introduction',
    description: 'Welcome to CV Tutorial',
    icon: <LayoutIcon className="text-foreground" />,
    url: '/docs',
  },
  {
    title: 'CV Fundamentals',
    description: 'Basics of Image Processing',
    icon: <Book className="text-blue-400" />,
    url: '/docs/cv-fundamentals',
  },
  {
    title: 'Deep Learning',
    description: 'Neural Networks & Training',
    icon: <Brain className="text-purple-400" />,
    url: '/docs/deep-learning',
  },
  {
    title: 'Projects',
    description: 'Real-world Applications',
    icon: <Code className="text-emerald-400" />,
    url: '/docs/projects',
  },
  {
    title: 'Tools',
    description: 'OpenCV, PyTorch, etc.',
    icon: <Cpu className="text-orange-400" />,
    url: '/docs/tools',
  },
  {
    title: 'Models',
    description: 'State-of-the-art Architectures',
    icon: <Layers className="text-pink-400" />,
    url: '/docs/models',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout 
      tree={source.getPageTree()} 
      {...baseOptions()}
      sidebar={{
        tabs: ROOTS
      }}
    >
      {children}
    </DocsLayout>
  );
}
