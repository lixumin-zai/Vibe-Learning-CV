import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-bold select-none">
          <span className="w-2 h-2 rounded-full bg-fd-primary" />
          CV Tutorial
        </span>
      ),
    },
    links: [
    ],
  };
}
