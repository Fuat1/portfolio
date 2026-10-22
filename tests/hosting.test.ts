import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { site } from '../content/site';

type HeaderRule = { source: string; headers: { key: string; value: string }[] };

const firebase = JSON.parse(readFileSync('firebase.json', 'utf8')) as {
  hosting: { public: string; cleanUrls: boolean; headers: HeaderRule[] };
  database?: unknown;
};
// serve.json mirrors the production headers for local previews and the Playwright run.
const serve = JSON.parse(readFileSync('serve.json', 'utf8')) as { headers: HeaderRule[] };

function header(rules: HeaderRule[], source: string, key: string) {
  return rules.find((rule) => rule.source === source)?.headers.find((h) => h.key === key)?.value;
}

describe('firebase.json', () => {
  it('serves the static export with clean URLs and no database config', () => {
    expect(firebase.hosting.public).toBe('out');
    expect(firebase.hosting.cleanUrls).toBe(true);
    expect(firebase.database).toBeUndefined();
  });

  it('caches hashed Next.js assets for a year', () => {
    expect(header(firebase.hosting.headers, '/_next/static/**', 'Cache-Control')).toBe('public, max-age=31536000, immutable');
  });

  it('names the CV download after content/site.ts, in production and locally', () => {
    const expected = `attachment; filename="${site.profile.cv.fileName}"`;
    expect(header(firebase.hosting.headers, '/cv.pdf', 'Content-Disposition')).toBe(expected);
    expect(header(serve.headers, 'cv.pdf', 'Content-Disposition')).toBe(expected);
  });

  it('serves extensionless Open Graph images as PNG, in production and locally', () => {
    expect(header(firebase.hosting.headers, '**/opengraph-image', 'Content-Type')).toBe('image/png');
    expect(header(serve.headers, '**/opengraph-image', 'Content-Type')).toBe('image/png');
  });
});
