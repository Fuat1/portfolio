import Link from 'next/link';
import { site } from '@/lib/content';
import { ContactLinks } from './contact-links';

export function Hero() {
  const { profile, highlights } = site;
  const [first, ...rest] = profile.name.split(' ');

  return (
    <section aria-labelledby="hero-title" className="relative isolate">
      <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10" />
      <div className="shell pt-12 pb-14 sm:pt-20 sm:pb-16">
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="inline-flex items-center gap-2 text-fg">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </span>
          <span aria-hidden="true">/</span>
          <span>
            {profile.location} · {profile.remote}
          </span>
        </p>

        <h1 id="hero-title" className="mt-7 text-[clamp(3.25rem,13vw,8.75rem)] leading-[0.86] font-semibold tracking-[-0.05em]">
          <span className="block">{first}</span> <span className="block">{rest.join(' ')}</span>
        </h1>

        <p className="mt-8 max-w-3xl text-2xl leading-snug tracking-tight text-balance sm:text-[2rem]">{profile.positioning}</p>
        <p className="mt-5 max-w-2xl text-base text-pretty text-muted sm:text-lg">{profile.summary}</p>

        <ContactLinks className="mt-9" />
      </div>

      <div className="shell pb-20">
        <h2 className="sr-only">Highlights</h2>
        <ul className="grid overflow-hidden rounded-2xl border border-line bg-line [gap:1px] sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight) => (
            <li key={highlight.projectSlug} className="bg-bg">
              <Link
                href={`/projects/${highlight.projectSlug}`}
                className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-surface sm:p-6"
              >
                <span className="font-mono text-3xl font-medium tracking-tight group-hover:text-accent">{highlight.value}</span>
                <span className="text-sm text-muted">{highlight.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
