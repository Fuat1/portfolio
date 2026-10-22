import { site } from '@/content/site';
import type { Experience, Project } from '@/content/schema';

export { site };

export function getProject(slug: string): Project | undefined {
  return site.projects.find((project) => project.slug === slug);
}

/** Previous and next project, wrapping around, for the case-study footer. */
export function getAdjacentProjects(slug: string): { prev: Project; next: Project } {
  const { projects } = site;
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    prev: projects[(index - 1 + projects.length) % projects.length]!,
    next: projects[(index + 1) % projects.length]!,
  };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatYearMonth(value: string): string {
  const [year, month] = value.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year!;
}

export function formatPeriod({ start, end }: Pick<Experience, 'start' | 'end'>): string {
  if (start === end) return formatYearMonth(start);
  return `${formatYearMonth(start)} – ${end === 'present' ? 'Present' : formatYearMonth(end)}`;
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url).toString();
}
