import Link from 'next/link';
import { formatPeriod, getProject, site } from '@/lib/content';
import { ArrowRight } from './icons';

export function ExperienceTimeline() {
  const { experience, education } = site;
  return (
    <div className="mt-10">
      <ol>
        {experience.map((entry) => (
          <li key={entry.org} className="grid gap-x-8 gap-y-2 border-t border-line py-8 md:grid-cols-[12rem_1fr]">
            <p className="font-mono text-sm text-muted md:pt-1.5">{formatPeriod(entry)}</p>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{entry.org}</h3>
              <p className="mt-1 text-muted">
                {entry.role}
                {entry.orgNote ? <> · {entry.orgNote}</> : null}
              </p>
              <ul className="mt-4 space-y-2">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="relative pl-6 text-pretty">
                    <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-3 bg-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
              {entry.projectSlugs.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {entry.projectSlugs.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/projects/${slug}`}
                        className="inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 hover:decoration-accent"
                      >
                        Case study: {getProject(slug)?.title}
                        <ArrowRight />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="grid gap-x-8 gap-y-2 border-t border-b border-line py-8 md:grid-cols-[12rem_1fr]">
        <p className="font-mono text-sm text-muted md:pt-1">{education.year}</p>
        <div>
          <h3 className="label">Education</h3>
          <p className="mt-2 font-medium">{education.degree}</p>
          <p className="text-muted">
            {education.school} · {education.location}
          </p>
        </div>
      </div>
    </div>
  );
}
