import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContactLinks } from '@/components/contact-links';
import { Diagram } from '@/components/diagram';
import { ExternalLink } from '@/components/external-link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/icons';
import { getAdjacentProjects, getProject, site } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  const description = `${project.summary} Outcome: ${project.headline}.`;
  return {
    title: project.title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, siteName: site.profile.name, title: `${project.title} · ${site.profile.name}`, description },
    twitter: { card: 'summary_large_image', title: project.title, description },
  };
}

function CaseSection({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  const id = `section-${index}`;
  return (
    <section aria-labelledby={id} className="grid gap-4 border-t border-line pt-6 lg:grid-cols-[13rem_1fr] lg:gap-10">
      <h2 id={id} className="flex items-baseline gap-3">
        <span aria-hidden="true" className="font-mono text-sm text-accent">
          {index}
        </span>
        <span className="text-xl font-semibold tracking-tight">{title}</span>
      </h2>
      <div className="max-w-3xl">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <article>
      <header className="relative isolate border-b border-line">
        <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10" />
        <div className="shell pt-8 pb-12 sm:pt-12 sm:pb-16">
          <Link href="/#work" className="inline-flex items-center gap-2 rounded-sm text-sm text-muted hover:text-fg">
            <ArrowLeft />
            All work
          </Link>
          <p className="label mt-10">
            {project.context}
            {project.period ? ` · ${project.period}` : null}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-pretty text-muted sm:text-2xl">{project.summary}</p>

          <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <dt className="label">Role</dt>
              <dd className="mt-1.5">{project.role}</dd>
            </div>
            <div className={project.links.length > 0 ? '' : 'sm:col-span-2'}>
              <dt className="label">Outcome</dt>
              <dd className="mt-1.5 font-medium">{project.headline}</dd>
            </div>
            {project.links.length > 0 ? (
              <div>
                <dt className="label">Links</dt>
                <dd className="mt-1.5">
                  <ul>
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <ExternalLink href={link.href} className="inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 hover:decoration-accent">
                          {link.label}
                          <ArrowUpRight />
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </header>

      <div className="shell space-y-8 py-12 sm:py-16">
        {project.screenshot ? (
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            width={project.screenshot.width}
            height={project.screenshot.height}
            priority
            className="h-auto w-full rounded-2xl border border-line"
          />
        ) : null}
        <Diagram diagram={project.diagram} />
      </div>

      <div className="shell space-y-12 pb-16 sm:pb-20">
        <CaseSection index="01" title="Problem">
          <p className="text-lg text-pretty">{project.problem}</p>
        </CaseSection>

        <CaseSection index="02" title="What I built">
          <ul className="space-y-3">
            {project.built.map((item) => (
              <li key={item} className="relative pl-6 text-pretty">
                <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-3 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection index="03" title="Stack">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[13px]">
                {tech}
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection index="04" title="Outcome">
          <ul className="space-y-3">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 text-lg text-pretty">
                <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 rounded-xs bg-accent" />
                {outcome}
              </li>
            ))}
          </ul>
        </CaseSection>
      </div>

      <nav aria-label="More case studies" className="border-t border-line">
        <ul className="shell grid gap-6 py-10 sm:grid-cols-2">
          <li>
            <Link href={`/projects/${prev.slug}`} className="group inline-flex flex-col gap-1 rounded-sm">
              <span className="label inline-flex items-center gap-2">
                <ArrowLeft /> Previous
              </span>
              <span className="text-lg font-semibold group-hover:text-accent">{prev.title}</span>
            </Link>
          </li>
          <li className="sm:text-right">
            <Link href={`/projects/${next.slug}`} className="group inline-flex flex-col gap-1 rounded-sm sm:items-end">
              <span className="label inline-flex items-center gap-2">
                Next <ArrowRight />
              </span>
              <span className="text-lg font-semibold group-hover:text-accent">{next.title}</span>
            </Link>
          </li>
        </ul>
      </nav>

      <section aria-labelledby="cta-title" className="shell pb-20">
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
          <h2 id="cta-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Hiring, or need a contractor?
          </h2>
          <p className="mt-2 text-muted">{site.profile.availability}.</p>
          <ContactLinks className="mt-6" />
        </div>
      </section>
    </article>
  );
}
