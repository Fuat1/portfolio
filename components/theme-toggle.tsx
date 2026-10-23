'use client';

import { useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY } from '@/app/theme-script';
import { Moon, Sun } from './icons';

type Theme = 'light' | 'dark';

const darkQuery = '(prefers-color-scheme: dark)';

function subscribe(onChange: () => void) {
  const media = window.matchMedia(darkQuery);
  const observer = new MutationObserver(onChange);
  media.addEventListener('change', onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => {
    media.removeEventListener('change', onChange);
    observer.disconnect();
  };
}

function getTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return window.matchMedia(darkQuery).matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  // null on the server and during hydration; the icons below switch through CSS, so nothing flashes.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);

  function toggle() {
    const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark mode"
      aria-pressed={theme === null ? undefined : theme === 'dark'}
      title="Toggle dark mode"
      className="inline-flex size-10 items-center justify-center rounded-full border border-line text-lg text-fg transition-colors hover:border-fg"
    >
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </button>
  );
}
