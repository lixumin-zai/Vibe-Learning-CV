import { getPageImage, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const gitConfig = {
    user: 'username',
    repo: 'repo',
    branch: 'main',
  };

  return (
    <DocsPage 
      toc={page.data.toc} 
      full={page.data.full}
      tableOfContent={{
        style: 'clerk',
        single: false
      }}
    >
      <DocsTitle className="text-4xl font-extrabold tracking-tight mb-4">{page.data.title}</DocsTitle>
      <DocsDescription className="text-lg text-muted-foreground mb-8 border-l-4 border-primary/20 pl-4 italic">
        {page.data.description}
      </DocsDescription>
      
      <div className="flex flex-row gap-2 items-center border-b pb-6 mb-8">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          // update it to match your repo
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/docs/content/docs/${page.path}`}
        />
      </div>

      <DocsBody className="prose-lg prose-headings:font-sans">
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
