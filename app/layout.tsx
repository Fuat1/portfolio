import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { site } from '@/lib/content';
import { themeScript } from './theme-script';
import './globals.css';

const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-sans-family', display: 'swap' });
// Both fonts stay preloaded: without it the late mono swap re-wraps labels and causes layout shift.
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-family', display: 'swap' });

const title = `${site.profile.name} · ${site.profile.role}`;
const description = `${site.profile.positioning} ${site.profile.availability}. ${site.profile.location}, remote (${site.profile.timezone}).`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.profile.name}` },
  description,
  applicationName: site.profile.name,
  authors: [{ name: site.profile.name, url: site.url }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    firstName: 'Fuat',
    lastName: 'Shakjiri',
    url: '/',
    siteName: site.profile.name,
    title,
    description,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title, description },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f6f3' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0e0c' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
