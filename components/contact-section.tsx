import { site } from '@/lib/content';
import { ExternalLink } from './external-link';
import { ArrowUpRight, LinkedIn, Mail } from './icons';

const row =
  'group flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-lg font-medium transition-colors sm:px-6 sm:py-5';

export function ContactSection() {
  const { profile } = site;
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
      <div>
        <p className="text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-balance">
          Hiring, or need a contractor? Let’s talk.
        </p>
        <p className="mt-5 max-w-xl text-muted">
          {profile.availability}. {profile.location} · {profile.remote}.
        </p>
      </div>
      <ul className="flex flex-col gap-3">
        <li>
          <a href={`mailto:${profile.email}`} className={`${row} bg-accent text-accent-fg hover:bg-fg hover:text-bg`}>
            <span className="flex min-w-0 items-center gap-3">
              <Mail className="shrink-0" />
              <span className="truncate">{profile.email}</span>
            </span>
            <ArrowUpRight className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </li>
        <li>
          <ExternalLink href={profile.linkedin} className={`${row} border border-line hover:border-fg`}>
            <span className="flex items-center gap-3">
              <LinkedIn className="shrink-0" />
              LinkedIn
            </span>
            <ArrowUpRight className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ExternalLink>
        </li>
      </ul>
    </div>
  );
}
