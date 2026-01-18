import type { Route } from './+types/page';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { source } from '@/lib/source';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import browserCollections from 'fumadocs-mdx:collections/browser';
import { baseOptions } from '@/lib/layout.shared';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { Book, Brain, Code, Cpu, Layers, Layout, Rocket, ScanEye, Terminal, MousePointer2 } from 'lucide-react';

import { SamplingDemo } from '@/components/docs/cv-fundamentals/image-perception/SamplingDemo';
import { QuantizationDemo } from '@/components/docs/cv-fundamentals/image-perception/QuantizationDemo';
import { AliasingDemo } from '@/components/docs/cv-fundamentals/image-perception/AliasingDemo';

const icons = {
  Book, Brain, Code, Cpu, Layers, Layout, Rocket, ScanEye, Terminal, MousePointer2,
  SamplingDemo, QuantizationDemo, AliasingDemo
};

const ROOTS = [
    {
        title: 'Introduction',
        description: 'Welcome to CV Tutorial',
        icon: <Layout className="text-foreground" />,
        url: '/docs',
    },
    {
        title: 'CV Fundamentals',
        description: 'Basics of Image Processing',
        icon: <Book className="text-blue-500" />,
        url: '/docs/cv-fundamentals',
    },
    {
        title: 'Deep Learning',
        description: 'Neural Networks & Training',
        icon: <Brain className="text-purple-500" />,
        url: '/docs/deep-learning',
    },
    {
        title: 'Projects',
        description: 'Real-world Applications',
        icon: <Code className="text-emerald-500" />,
        url: '/docs/projects',
    },
    {
        title: 'Tools',
        description: 'OpenCV, PyTorch, etc.',
        icon: <Cpu className="text-orange-500" />,
        url: '/docs/tools',
    },
    {
        title: 'Models',
        description: 'State-of-the-art Architectures',
        icon: <Layers className="text-pink-500" />,
        url: '/docs/models',
    },
];

export async function loader({ params }: Route.LoaderArgs) {
    const slugs = params['*'].split('/').filter((v) => v.length > 0);
    const page = source.getPage(slugs);
    if (!page) throw new Response('Not found', { status: 404 });

    // Filter page tree for current root
    const currentRoot = slugs[0]; // e.g., 'cv-fundamentals'
    const fullTree = source.getPageTree();

    // Find the sub-node in the tree that matches the current root
    const rootNode = fullTree.children.find((node) =>
        node.type === 'page' ? node.url.includes(`/${currentRoot}`)
            : (node.type === 'folder' && node.index?.url.includes(`/${currentRoot}`))
    ) || fullTree;

    // We want to pass the specific subtree to the layout
    // But DocsLayout expects a PageTree, so we might need to filter or construct one.
    // A simpler way: Find the folder node corresponding to currentRoot.

    // Actually, Fumadocs 'source' automatically groups by directory. 
    // We can look for a folder with the same name as the first slug.
    const subTree = (fullTree.children.find(
        (node) => node.type === 'folder' && node.name === ROOTS.find(r => r.url.endsWith(currentRoot))?.title
    ) || fullTree.children.find(
        // Fallback: search by URL pattern if name doesn't match exactly
        (node) => 'url' in node && node.url && typeof node.url === 'string' && node.url.includes(`/${currentRoot}`)
    )) as typeof fullTree | undefined;

    return {
        path: page.path,
        pageTree: await source.serializePageTree(subTree || fullTree),
    };
}

const clientLoader = browserCollections.docs.createClientLoader({
    component(
        { toc, frontmatter, default: Mdx },
        props: {
            className?: string;
        },
    ) {
        return (
            <DocsPage
                toc={toc}
                tableOfContent={{
                    style: 'clerk',
                    single: false
                }}
                {...props}
            >
                <DocsTitle className="text-4xl font-extrabold tracking-tight mb-4">{frontmatter.title}</DocsTitle>
                <DocsDescription className="text-lg text-muted-foreground mb-8 border-l-4 border-primary/20 pl-4 italic">
                    {frontmatter.description}
                </DocsDescription>
                <DocsBody className="prose-lg prose-headings:font-sans">
                    <Mdx components={{ ...defaultMdxComponents, ...icons }} />
                </DocsBody>
            </DocsPage>
        );
    },
});

export default function Page({ loaderData }: Route.ComponentProps) {
    const Content = clientLoader.getComponent(loaderData.path);
    const { pageTree } = useFumadocsLoader(loaderData);

    return (
        <DocsLayout
            {...baseOptions()}
            tree={pageTree}
            sidebar={{
                tabs: ROOTS
            }}
        >
            <Content />
        </DocsLayout>
    );
}
