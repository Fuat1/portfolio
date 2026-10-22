import { site } from '@/lib/content';
import { ogCard, ogSize } from '@/lib/og-card';

export const dynamic = 'force-static';
export const alt = `${site.profile.name}, ${site.profile.role}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return ogCard({
    eyebrow: `${site.profile.availability} · ${site.profile.location}, remote (${site.profile.timezone})`,
    title: site.profile.name,
    subtitle: site.profile.positioning,
  });
}
