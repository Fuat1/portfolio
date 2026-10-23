import Link from 'next/link';
import { site } from '@/lib/content';
import { ArrowUpRight } from './icons';

const MAX_TAGS = 5;

export function ProjectList() {
  return (
    <ol className="mt-10 border-t border-line">
      {site.projects.map((project, index) => {
        const hidden = project.stack.length - MAX_TAGS;
        return (
          <li key={project.slug} className="group relative border-b border-line">
            <div className="-mx-4 grid gap-x-8 gap-y-4 rounded-xl px-4 py-8 transition-colors group-hover:bg-surface group-has-focus-visible:bg-surface sm:-mx-6 sm:grid-cols-[3rem_1fr] sm:px-6 lg:grid-cols-[3rem_minmax(0,1.15fr)_minmax(0,1fr)_1.5rem]">
              <span className="font-mono text-sm text-muted" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  <Link href={`/projects/${project.slug}`} className="stretched-link transition-colors group-hover:text-accent">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-1.5 font-mono text-xs text-muted">
                  <span className="inline-block">{project.context}</span> · <span className="inline-block">{project.role}</span>
                </p>
                <p className="mt-3 text-pretty text-muted">{project.summary}</p>
              </div>

              <div className="sm:col-start-2 lg:col-start-auto lg:pt-1">
                <p className="label">Outcome</p>
                <p className="mt-1.5 font-medium text-pretty">{project.headline}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                  {project.stack.slice(0, MAX_TAGS).map((tech) => (
                    <li key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                      {tech}
                    </li>
                  ))}
                  {hidden > 0 ? (
                    <li className="px-1 py-0.5 font-mono text-[11px] text-muted">
                      +{hidden}
                      <span className="sr-only"> more</span>
                    </li>
                  ) : null}
                </ul>
              </div>

              <ArrowUpRight className="hidden text-2xl text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent lg:block" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
