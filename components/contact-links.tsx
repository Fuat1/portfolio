import { site } from '@/lib/content';
import { ExternalLink } from './external-link';
import { Download, GitHub, LinkedIn, Mail } from './icons';

const base =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors focus-visible:outline-offset-2';
const primary = `${base} bg-accent text-accent-fg hover:bg-fg hover:text-bg`;
const secondary = `${base} border border-line bg-bg text-fg hover:border-fg`;

/** Email, LinkedIn, GitHub and CV buttons. */
export function ContactLinks({ className = '' }: { className?: string }) {
  const { profile } = site;
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      <li>
        <a href={`mailto:${profile.email}`} className={primary}>
          <Mail className="text-lg" />
          Email me
        </a>
      </li>
      <li>
        <ExternalLink href={profile.linkedin} className={secondary}>
          <LinkedIn />
          LinkedIn
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={profile.github} className={secondary}>
          <GitHub />
          GitHub
        </ExternalLink>
      </li>
      <li>
        <a href={profile.cv.href} download={profile.cv.fileName} className={secondary}>
          <Download className="text-lg" />
          Download CV
          <span className="font-mono text-xs text-muted">PDF</span>
        </a>
      </li>
    </ul>
  );
}
