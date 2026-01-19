import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Book, MousePointer2, ScanEye, Brain, Terminal, Rocket } from 'lucide-react';

// Demo Components
import { ActivationPlot } from '@/components/demo/ActivationPlot';
import { ImageProcessor } from '@/components/demo/ImageProcessor';
import { CodeTerminal } from '@/components/demo/CodeTerminal';
import { ExcalidrawModal } from '@/components/demo/ExcalidrawModal';
import { ProjectCard } from '@/components/demo/ProjectCard';

// Doc Components
import { CVMindMap } from '@/components/docs/cv-fundamentals/CVMindMap';
import { SamplingDemo } from '@/components/docs/cv-fundamentals/image-perception/SamplingDemo';
import { QuantizationDemo } from '@/components/docs/cv-fundamentals/image-perception/QuantizationDemo';
import { AliasingDemo } from '@/components/docs/cv-fundamentals/image-perception/AliasingDemo';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Icons
    Book,
    MousePointer2,
    ScanEye,
    Brain,
    Terminal,
    Rocket,
    // Custom Components
    ActivationPlot,
    ImageProcessor,
    CodeTerminal,
    ExcalidrawModal,
    ProjectCard,
    CVMindMap,
    SamplingDemo,
    QuantizationDemo,
    AliasingDemo,
    ...components,
  };
}
