import Link from 'next/link';
import { site } from '@/lib/content';
import { navItems } from '@/lib/nav';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  const initials = site.profile.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="shell flex flex-wrap items-center gap-x-6 gap-y-1 py-3">
        <Link href="/" className="group flex items-center gap-3 rounded-sm font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-md bg-fg font-mono text-xs font-bold text-bg transition-colors group-hover:bg-accent group-hover:text-accent-fg"
          >
            {initials}
          </span>
          <span>{site.profile.name}</span>
        </Link>

        <div className="order-2 ml-auto sm:order-3 sm:ml-0">
          <ThemeToggle />
        </div>

        <nav aria-label="Primary" className="order-3 -mx-2 w-[calc(100%+1rem)] overflow-x-auto sm:order-2 sm:mx-0 sm:ml-auto sm:w-auto">
          <ul className="flex justify-between whitespace-nowrap sm:justify-start sm:gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  className="inline-block rounded-md px-2 py-2 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-fg sm:px-2.5"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
