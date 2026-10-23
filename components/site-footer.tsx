import { site } from '@/lib/content';

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.profile.name} · {site.profile.location}
        </p>
        <p className="font-mono text-xs">
          Next.js · static export · Firebase Hosting ·{' '}
          <a href="https://github.com/Fuat1/portfolio" className="underline decoration-line underline-offset-4 hover:text-fg hover:decoration-accent">
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
