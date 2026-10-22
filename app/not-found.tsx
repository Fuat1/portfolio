import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from '@/components/icons';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="shell py-24 sm:py-32">
      <p className="label">404</p>
      <h1 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.04em]">This page doesn’t exist.</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">The site was rebuilt in 2026, so older links may no longer work.</p>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 underline decoration-line underline-offset-4 hover:decoration-accent">
        <ArrowLeft />
        Back to the homepage
      </Link>
    </section>
  );
}
