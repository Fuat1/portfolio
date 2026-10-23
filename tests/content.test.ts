import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { site } from '../content/site';
import { siteSchema } from '../content/schema';
import { formatPeriod } from '../lib/content';

const slugs = site.projects.map((project) => project.slug);

/** Every string in the content, for the confidentiality checks. */
function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

describe('content/site.ts', () => {
  it('matches the schema', () => {
    const result = siteSchema.safeParse(site);
    expect(result.success ? [] : result.error.issues).toEqual([]);
  });

  it.each(site.projects.map((p) => [p.slug, p] as const))('project %s has a slug, stack and at least one outcome', (_, project) => {
    expect(project.slug).toMatch(/^[a-z0-9-]+$/);
    expect(project.stack.length).toBeGreaterThan(0);
    expect(project.outcomes.length).toBeGreaterThan(0);
    expect(project.built.length).toBeGreaterThan(0);
    expect(project.problem.length).toBeGreaterThan(0);
  });

  it('only references screenshots that exist in public/', () => {
    for (const project of site.projects) {
      if (project.screenshot) expect(existsSync(`public${project.screenshot.src}`), project.screenshot.src).toBe(true);
    }
  });

  it('has unique project slugs, including drafts', () => {
    const all = [...slugs, ...site.draftProjects.map((draft) => draft.slug)];
    expect(new Set(all).size).toBe(all.length);
  });

  it('only references projects that exist', () => {
    const referenced = [
      ...site.highlights.map((highlight) => highlight.projectSlug),
      ...site.experience.flatMap((entry) => entry.projectSlugs),
    ];
    for (const slug of referenced) expect(slugs).toContain(slug);
  });

  it('has experience periods that end on or after they start', () => {
    for (const entry of site.experience) {
      if (entry.end !== 'present') expect(entry.end >= entry.start, `${entry.org}: ${entry.start} → ${entry.end}`).toBe(true);
    }
  });

  it('formats periods', () => {
    expect(formatPeriod({ start: '2024-04', end: '2026-10' })).toBe('Apr 2024 – Oct 2026');
    expect(formatPeriod({ start: '2020-04', end: 'present' })).toBe('Apr 2020 – Present');
    expect(formatPeriod({ start: '2023', end: '2023' })).toBe('2023');
  });

  describe('confidentiality', () => {
    const strings = allStrings(site);

    it('contains no internal, API or private hosts', () => {
      const internal = /\b(localhost|127\.0\.0\.1|192\.168\.|10\.\d+\.\d+\.\d+|[\w-]+\.(local|internal|lan)\b|(api|admin|partners|staging|dev|internal)\.[\w-]+\.\w+)/i;
      expect(strings.filter((s) => internal.test(s))).toEqual([]);
    });

    it('contains no phone numbers', () => {
      expect(strings.filter((s) => /\+?\d[\d\s().-]{8,}\d/.test(s))).toEqual([]);
    });

    it('only links to public https URLs, never to repositories other than the GitHub profile', () => {
      const urls = strings.filter((s) => /^https?:\/\//.test(s));
      for (const url of urls) {
        expect(url.startsWith('https://')).toBe(true);
        if (url.includes('github.com')) expect(url).toBe(site.profile.github);
      }
    });
  });
});
