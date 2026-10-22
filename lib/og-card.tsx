import { ImageResponse } from 'next/og';
import { site } from './content';

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: dark, one accent colour, matching the site. */
export function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: 72,
          background: '#0f0e0c',
          backgroundImage: 'radial-gradient(#2c2925 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          color: '#f2efe9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#a39d94' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ff8c4a' }} />
          {eyebrow}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ fontSize: title.length > 24 ? 76 : 104, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 34, color: '#d6d1c8', lineHeight: 1.3, maxWidth: 1000 }}>{subtitle}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#a39d94' }}>
          <span>{site.profile.name}</span>
          <span style={{ color: '#ff8c4a' }}>{new URL(site.url).host}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
