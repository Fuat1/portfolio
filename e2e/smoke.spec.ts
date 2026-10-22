import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { site } from '../content/site';
import { navItems } from '../lib/nav';

const projectPaths = site.projects.map((project) => `/projects/${project.slug}`);

test('home renders the essentials', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Fuat Shakjiri/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(site.profile.name);
  await expect(page.getByText(site.profile.availability).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', `mailto:${site.profile.email}`);
  await expect(page.getByRole('link', { name: 'LinkedIn' }).first()).toHaveAttribute('href', site.profile.linkedin);
  await expect(page.getByRole('link', { name: 'GitHub' }).first()).toHaveAttribute('href', site.profile.github);
  for (const project of site.projects) {
    await expect(page.getByRole('link', { name: project.title, exact: true })).toHaveAttribute('href', `/projects/${project.slug}`);
  }
});

test('home has Person and ProfilePage JSON-LD', async ({ page }) => {
  await page.goto('/');
  const json = await page.locator('script[type="application/ld+json"]').textContent();
  const types = (JSON.parse(json!)['@graph'] as { '@type': string }[]).map((node) => node['@type']);
  expect(types).toEqual(expect.arrayContaining(['Person', 'ProfilePage']));
});

for (const item of navItems) {
  test(`nav anchor #${item.id} scrolls to its section`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: item.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${item.id}$`));
    await expect(page.locator(`#${item.id}`)).toBeInViewport();
  });
}

test('CV downloads as a PDF', async ({ page, request }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: /download cv/i });
  await expect(link).toHaveAttribute('href', site.profile.cv.href);
  const [download] = await Promise.all([page.waitForEvent('download'), link.click()]);
  expect(download.suggestedFilename()).toBe(site.profile.cv.fileName);

  const response = await request.get(site.profile.cv.href);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
});

for (const project of site.projects) {
  test(`project page /projects/${project.slug} returns 200`, async ({ page }) => {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    for (const heading of ['Problem', 'What I built', 'Stack', 'Outcome']) {
      await expect(page.getByRole('heading', { level: 2, name: heading, exact: true })).toBeVisible();
    }
  });
}

test('prefetching and client-side navigation cause no failed requests or console errors', async ({ page }) => {
  const failures: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  page.on('console', (message) => {
    if (message.type() === 'error') failures.push(message.text());
  });

  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); // brings every link into view → prefetch
  await page.waitForLoadState('networkidle');
  const [first] = site.projects;
  await page.getByRole('link', { name: first!.title, exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(first!.title);
  await page.waitForLoadState('networkidle');
  await page.getByRole('link', { name: 'All work' }).click();
  await expect(page).toHaveURL(/#work$/);

  expect(failures).toEqual([]);
});

test('unknown pages return 404', async ({ page }) => {
  const response = await page.goto('/does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/doesn’t exist/);
});

test('sitemap lists every page; robots points to it', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const path of ['/', ...projectPaths]) expect(sitemap).toContain(`<loc>${new URL(path, site.url)}</loc>`);
  expect(await (await request.get('/robots.txt')).text()).toContain(`Sitemap: ${site.url}/sitemap.xml`);
});

test('theme toggle switches theme and remembers it', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Dark mode' });
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('keyboard: the skip link is the first tab stop and jumps to main', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium');
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

for (const colorScheme of ['light', 'dark'] as const) {
  for (const path of ['/', ...projectPaths]) {
    test(`axe: no serious violations on ${path} (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      const serious = results.violations
        .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
        .map((violation) => ({ id: violation.id, help: violation.help, targets: violation.nodes.map((node) => node.target.join(' ')) }));
      expect(serious).toEqual([]);
    });
  }
}
