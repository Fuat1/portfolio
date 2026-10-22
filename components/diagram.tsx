import type { Diagram as DiagramData } from '@/content/schema';
import { ArrowRight } from './icons';

type Flow = Extract<DiagramData, { kind: 'flow' }>;
type Metrics = Extract<DiagramData, { kind: 'metrics' }>;

/**
 * Generated stand-in for a screenshot, built from the project's content.
 * Plain HTML (not an image), so it is readable by screen readers, themable and causes no layout shift.
 */
export function Diagram({ diagram }: { diagram: DiagramData }) {
  return (
    <figure className="rounded-2xl border border-line bg-surface p-4 sm:p-8">
      {diagram.kind === 'flow' ? <FlowDiagram diagram={diagram} /> : <MetricsDiagram diagram={diagram} />}
      <figcaption className="mt-6 flex items-center gap-3 font-mono text-xs text-muted">
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        {diagram.caption}
      </figcaption>
    </figure>
  );
}

function FlowDiagram({ diagram }: { diagram: Flow }) {
  return (
    <ol className="flex flex-col md:flex-row md:items-stretch">
      {diagram.columns.map((column, index) => (
        <li key={column.title} className="flex flex-col md:flex-1 md:flex-row md:items-center">
          {index > 0 ? (
            <span aria-hidden="true" className="flex justify-center py-2 text-xl text-accent md:px-3 md:py-0">
              <ArrowRight className="rotate-90 md:rotate-0" />
            </span>
          ) : null}
          <div className="flex-1 self-stretch rounded-xl border border-dashed border-line p-3">
            <p className="label">{column.title}</p>
            <ul className="mt-2.5 space-y-2">
              {column.items.map((item) => (
                <li key={item} className="rounded-lg border border-line bg-bg px-3 py-2 font-mono text-[13px] leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

function MetricsDiagram({ diagram }: { diagram: Metrics }) {
  return (
    <div className="space-y-8">
      {diagram.metrics.map((metric) => {
        const width = (value: number) => `${Math.min(100, (value / metric.scaleMax) * 100)}%`;
        return (
          <div key={metric.label}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-medium">{metric.label}</p>
              <p className="font-mono text-xs text-muted">{metric.betterWhen} is better</p>
            </div>
            <dl className="mt-3 space-y-2">
              {(
                [
                  ['Before', metric.before, 'bg-muted'],
                  ['After', metric.after, 'bg-accent'],
                ] as const
              ).map(([term, value, tone]) => (
                <div key={term} className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
                  <dt className="label">{term}</dt>
                  <dd className="flex items-center gap-3">
                    <span aria-hidden="true" className="h-3 flex-1 overflow-hidden rounded-full bg-bg ring-1 ring-line">
                      <span className={`block h-full rounded-full ${tone}`} style={{ width: width(value) }} />
                    </span>
                    <span className="w-12 text-right font-mono text-sm">{value}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
}
