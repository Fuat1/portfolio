import { getProject, site } from '@/lib/content';
import { ogCard, ogSize } from '@/lib/og-card';

export const dynamic = 'force-static';
export const alt = 'Case study';
export const size = ogSize;
export const contentType = 'image/png';

export function generateStaticParams() {
  return site.projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)!;
  return ogCard({ eyebrow: `Case study · ${project.context}`, title: project.title, subtitle: project.headline });
}
