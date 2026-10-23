import type { Product } from '@/content/schema';
import { site } from '@/lib/content';
import { ArrowUpRight } from './icons';

const statusLabel: Record<Product['status'], string> = {
  'launching-soon': 'Launching soon',
  live: 'Live',
};

export function ProductCards() {
  return (
    <ul className="mt-10 grid gap-5 md:grid-cols-2">
      {site.products.map((product) => (
        <li key={product.name} className="flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-semibold tracking-tight">{product.name}</h3>
            <span className="rounded-full border border-accent px-3 py-1 font-mono text-xs text-accent">{statusLabel[product.status]}</span>
          </div>
          <p className="mt-4 text-pretty text-muted">{product.description ?? 'Details at launch.'}</p>
          {product.stack.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
              {product.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}
          {product.href ? (
            <a href={product.href} className="mt-6 inline-flex items-center gap-1.5 self-start underline underline-offset-4">
              {new URL(product.href).hostname}
              <ArrowUpRight />
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
