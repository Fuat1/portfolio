# fuat-portfolio

Personal site of Fuat Shakjiri: <https://fuat-portfolio.web.app>

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · fully static (`output: 'export'`) · Firebase Hosting.

## Run locally

Requires Node 24 (`.nvmrc`).

```bash
npm ci
npm run dev          # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static export to `out/` (checks `public/cv.pdf` first) |
| `npm run preview` | Serves `out/` on <http://localhost:4173> with the production headers (`serve.json`) |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm test` | Vitest: content schema, confidentiality guards, hosting config |
| `npm run test:e2e` | Playwright smoke tests + axe, desktop and mobile (run `npm run build` first) |
| `npm run check` | All of the above, in order |

## Edit content

Everything on the site comes from **`content/site.ts`**: profile, highlights, projects, experience, skills and products. Edit the data, not the JSX. `npm test` validates it against `content/schema.ts`.

Rules (enforced where possible by `tests/content.test.ts`):

- Every fact must come from the CV. No invented metrics, clients, dates or claims.
- No client internals, private repository links, internal or API hostnames, or phone numbers.
- Every project needs a slug, problem, what was built, stack and at least one outcome.

Common edits:

- **Replace the CV:** overwrite `public/cv.pdf`, then re-check `content/site.ts` against it. Visitors download it as `Fuat-Shakjiri-CV.pdf`. The repo is public, so the committed CV is public too. The build fails in CI if the file is missing.
- **Add a case study:** add an entry to `projects`. It gets a card on the home page, a page at `/projects/<slug>`, a sitemap entry and an Open Graph image automatically.
- **Publish a draft project:** fill in its facts, move it from `draftProjects` to `projects`.
- **Add a real screenshot:** save it as `public/projects/<slug>.webp` and set `screenshot: { src: '/projects/<slug>.webp', alt: '…', width, height }` on the project. It is shown above the diagram.

## Placeholders to replace

Every case study currently shows a diagram generated from its `diagram` data instead of a screenshot:

| Page | Generated placeholder | Could be replaced with |
| --- | --- | --- |
| `/projects/laigo-api-platform` | Architecture: frontend and the services it talks to | App screenshot, if shareable |
| `/projects/strongesim` | Providers → eSIM API → sales channels | Store or app screenshots |
| `/projects/tracemind` | On-device indexing and RRF search | Chrome Web Store screenshots |
| `/projects/laigo-ai-rebuild` | Before/after bars: CLS, Lighthouse, HTML size | Lighthouse report screenshots |
| `/projects/multi-brand-catalog-sync` | External sources → Directus Flows → brands | Data-model screenshot without client data |
| `/projects/mojauto` | Sign-in → app → services | Site screenshots |
| `/projects/glocal-spectrum` | PostgreSQL/PostGIS → Next.js → archive and atlas | Atlas screenshot |
| `/projects/ai-automation` | The n8n pipeline in five stages | n8n canvas screenshot |

`app/icon.svg` is a simple "FS" monogram.

Open Graph images (`app/opengraph-image.tsx`, `app/projects/[slug]/opengraph-image.tsx`) are generated from the content at build time. They are not placeholders.

## Deploy

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, unit tests, build and Playwright on every run, then:

- **Pull request** → deploys to a Firebase preview channel (expires after 7 days). The URL is posted on the PR.
- **Push to `master`** → deploys to the live site. Merging a PR is the go-live.

### One-time setup: the deploy secret

The workflow expects a repository secret named `FIREBASE_SERVICE_ACCOUNT_FUAT_PORTFOLIO`. To create it:

```bash
npx firebase-tools init hosting:github
```

It creates a service account with Hosting permissions and stores its key as that secret. It also writes two workflow files (`firebase-hosting-merge.yml`, `firebase-hosting-pull-request.yml`). Delete them: `ci.yml` already does that job, after the tests.

### Manual deploy (fallback)

```bash
npm run build
npx firebase-tools hosting:channel:deploy my-preview --expires 7d   # preview URL
npx firebase-tools deploy --only hosting                             # live
```

## Roll back

- **Fastest:** Firebase console → Hosting → Release history → pick the previous release → Rollback. Instant, no rebuild.
- **Source:** the Angular site is tagged `v1-angular`: `git checkout v1-angular`. Note: Dependabot had already bumped `@angular/core` to 20 on that commit while the other Angular packages were on 13, so it may need dependency fixes before it builds.

## Notes

- `scripts/fix-segment-paths.mjs` works around a Next.js 16 static-export bug on Windows: prefetch files are written into nested folders instead of dot-joined names, so client navigation would 404. It does nothing on Linux (CI). The e2e test "prefetching and client-side navigation cause no failed requests" catches a regression.
- `firebase.json` sets the CV download filename and the PNG content type for the extensionless Open Graph images. `serve.json` mirrors those headers locally, and `tests/hosting.test.ts` keeps the two in sync.
