import type { Site } from './schema';

/**
 * All site content lives here. Edit data, not JSX.
 *
 * Rules for editing:
 * - Every fact must come from the CV (public/cv.pdf). No invented metrics, clients, dates or claims.
 * - No client internals, private repository links or internal/API hostnames.
 * - `npm test` validates this file against content/schema.ts.
 */
export const site: Site = {
  url: 'https://fuat-portfolio.web.app',

  profile: {
    name: 'Fuat Shakjiri',
    role: 'Senior Full-Stack Engineer',
    positioning: 'Senior full-stack engineer: TypeScript, React/Next.js, Node.js, Directus and AI automation.',
    summary:
      'Seven years of experience building for European clients, as an employee and as a contractor. I build multi-provider APIs, payment flows and AI features, and ship them with rehearsed deploys and tested rollbacks. Since 2020 I’ve worked on web apps, websites and e-commerce for Laigo, a German AI company, including three years in its Skopje office. I also co-founded StrongEsim, an eSIM platform.',
    location: 'North Macedonia',
    remote: 'Remote, any time zone',
    availability: 'Open to B2B contracts and employment',
    email: 'fuat.shakjiri@gmail.com',
    linkedin: 'https://www.linkedin.com/in/fuat-shakjiri/',
    github: 'https://github.com/Fuat1',
    cv: { href: '/cv.pdf', fileName: 'Fuat-Shakjiri-CV.pdf' },
  },

  highlights: [
    { value: '~60%', label: 'of 1,300 commits on the Laigo API Platform, as lead frontend developer', projectSlug: 'laigo-api-platform' },
    { value: '4', label: 'eSIM providers behind one API, a partner portal, a store and an app', projectSlug: 'strongesim' },
    { value: '78 → 97', label: 'Lighthouse on the laigo.ai rebuild; desktop CLS 0.347 → 0 on the live site', projectSlug: 'laigo-ai-rebuild' },
    { value: '3,000+', label: 'products synced for 4 brands with Directus Flows', projectSlug: 'multi-brand-catalog-sync' },
  ],

  projects: [
    {
      slug: 'laigo-api-platform',
      title: 'Laigo API Platform',
      context: 'Laigo GmbH · Germany',
      role: 'Lead frontend developer, team of 2–4',
      period: '2023 – 2025',
      summary: 'AI document-processing SaaS. I was the lead frontend developer in a team of 2–4, and its top contributor.',
      headline: 'Top contributor: ~60% of 1,300 commits, ~29k lines of React 18',
      problem:
        'Laigo sells AI document processing as a SaaS. Customers upload documents, edit and regenerate the results and export them, behind single sign-on and paid plans, across four deployments including a white-label partner.',
      built: [
        'Led the frontend with a team of 2–4 as the top contributor: ~60% of 1,300 commits, ~29k lines of React 18.',
        'Built the SmartLedger and SmartID tools from scratch, and the retry and polling logic of the shared upload → edit → regenerate → export flow (Redux Toolkit, TanStack Table, in-browser PDF preview).',
        'Keycloak OIDC login: PKCE, silent SSO, token refresh through Axios interceptors, role-based routes.',
        'Stripe Embedded Checkout and, before it, Braintree Drop-in with 3-D Secure.',
        'Usage dashboards, user and role admin, shared shadcn/ui components, 5 languages, and env-based switching across 4 deployments, including a white-label partner.',
        'Earlier, the platform’s Vue 3 portal for subscriptions, uploads and OCR results.',
      ],
      stack: ['React 18', 'Redux Toolkit', 'TanStack Table', 'shadcn/ui', 'Axios', 'Keycloak (OIDC, PKCE)', 'Stripe', 'Braintree', 'Vue 3'],
      outcomes: [
        'Top contributor: ~60% of 1,300 commits.',
        'One frontend serving 4 deployments, including a white-label partner, in 5 languages.',
        'Single sign-on with Keycloak OIDC, silent SSO and role-based routes.',
      ],
      links: [],
      diagram: {
        kind: 'flow',
        caption: 'Simplified: the frontend and the services it talks to.',
        columns: [
          { title: 'Customer', items: ['Browser'] },
          { title: 'Frontend', items: ['React 18 SPA', 'Upload → edit → export flow'] },
          { title: 'Services', items: ['Keycloak · OIDC', 'Document-processing API', 'Stripe · Braintree (3DS)'] },
        ],
      },
    },
    {
      slug: 'strongesim',
      title: 'StrongEsim',
      context: 'Own company · co-founded',
      role: 'Co-founder & full-stack engineer',
      period: '2023 – present',
      summary: 'eSIM business I co-founded: one API over four providers, a B2B partner portal, a B2C store and a React Native app.',
      headline: 'One API over 4 eSIM providers, 3,000+ products, app live on both stores',
      problem:
        'Sell eSIMs from four upstream providers to partners (B2B) and to consumers (B2C) through a portal, a web store and a mobile app, with prepaid wallets and refunds when an activation fails.',
      built: [
        'Designed the modular eSIM API (Node.js 22, Express, Sequelize, PostgreSQL, Redis, BullMQ) over four providers, with fallback.',
        'A prepaid wallet and credit ledger with PayPal and Stripe top-ups and low-balance checks; Shopify order provisioning, partner webhooks, scheduled price sync and invoicing; Swagger docs for internal and partner use.',
        'The B2B partner portal (Next.js 15) and the B2C store (Next.js 16) on the same API: PayPal Card Fields with 3-D Secure, automatic refunds when activation fails, and Stripe.',
        'The React Native app (0.84, New Architecture): Stripe card and Apple Pay checkout, Google and Apple sign-in, Keychain-secured sessions and eSIM QR codes.',
        'Docker behind nginx, with backup, health-check and auto-rollback deploys.',
      ],
      stack: ['Node.js 22', 'Express', 'Sequelize', 'PostgreSQL', 'Redis', 'BullMQ', 'Swagger / OpenAPI', 'Next.js', 'PayPal', 'Stripe', 'Shopify API', 'React Native', 'Docker', 'nginx'],
      outcomes: [
        '3,000+ eSIM products on one API.',
        'React Native app live on Google Play and the App Store.',
        'Automatic refunds when an activation fails.',
        'Deploys with backups, health checks and automatic rollback.',
      ],
      links: [{ label: 'strongesim.com', href: 'https://strongesim.com' }],
      diagram: {
        kind: 'flow',
        caption: 'One API in front of four providers, shared by every sales channel.',
        columns: [
          { title: 'Upstream', items: ['4 eSIM providers'] },
          { title: 'Core', items: ['eSIM API', 'Fallback · BullMQ queues', 'Wallet & credit ledger'] },
          { title: 'Channels', items: ['Partner portal (B2B)', 'Store (B2C)', 'React Native app', 'Shopify orders'] },
        ],
      },
    },
    {
      slug: 'tracemind',
      title: 'TraceMind',
      context: 'Own product',
      role: 'Product & engineering',
      summary: 'Privacy-first Chrome extension for semantic search across your browser history, with on-device embeddings.',
      headline: 'Live on the Chrome Web Store',
      problem:
        'Find a page from your browsing history by what it was about, not by remembering the exact words in its title, while keeping that history on your own device.',
      built: [
        'Chrome extension on Manifest V3 with on-device embeddings via Transformers.js: WebGPU, with a WASM fallback.',
        'Hybrid search: vector and full-text results merged with Reciprocal Rank Fusion.',
        'Chat with streaming responses from OpenAI, Anthropic and Gemini.',
        'Next.js 16 website with Paddle billing and Ed25519-signed licenses.',
      ],
      stack: ['Chrome Extension (Manifest V3)', 'Transformers.js', 'WebGPU / WASM', 'Reciprocal Rank Fusion', 'OpenAI · Anthropic · Gemini', 'Next.js 16', 'Paddle', 'Ed25519'],
      outcomes: [
        'Live on the Chrome Web Store.',
        'Embeddings computed on-device, on WebGPU or WASM.',
        'Paid licenses through Paddle, signed with Ed25519.',
      ],
      links: [{ label: 'tracemind.app', href: 'https://tracemind.app' }],
      diagram: {
        kind: 'flow',
        caption: 'Indexing and search run inside the browser.',
        columns: [
          { title: 'Browser', items: ['History'] },
          { title: 'On-device index', items: ['Transformers.js embeddings', 'Full-text index'] },
          { title: 'Search', items: ['RRF fusion', 'Ranked results'] },
        ],
      },
    },
    {
      slug: 'laigo-ai-rebuild',
      title: 'laigo.ai remediation & rebuild',
      context: 'Laigo GmbH · Germany',
      role: 'Frontend, remediation and rebuild',
      summary:
        'Remediated the live WordPress site through scripted releases with tested rollbacks, then rebuilt it as a Next.js 16 static export on Payload CMS 3.',
      headline: 'Desktop CLS 0.347 → 0 live; Lighthouse 78 → 97 on the rebuild',
      problem:
        'laigo.ai ran on WordPress with a desktop Cumulative Layout Shift of 0.347, PHP stored in the database and no SEO/GEO structured data.',
      built: [
        'Redesigned the WordPress frontend.',
        'Ran the remediation as rehearsed, scripted releases with tested rollbacks: plugin cleanup, database-stored PHP moved into version-controlled mu-plugins, SEO/GEO structured data.',
        'Rebuilt the site as a Next.js 16 static export with Payload CMS 3 and PostgreSQL, React 19, Tailwind CSS 4, Vitest, Playwright and GitLab CI, with CMS builds byte-identical to Git builds.',
        'Prototyped a coding-assistant UI in Next.js on Laigo’s own model.',
      ],
      stack: ['WordPress', 'mu-plugins', 'Next.js 16', 'Payload CMS 3', 'PostgreSQL', 'React 19', 'Tailwind CSS 4', 'Vitest', 'Playwright', 'GitLab CI'],
      outcomes: [
        'Desktop CLS 0.347 → 0 on the live WordPress site.',
        'Rebuild: Lighthouse 78 → 97 and HTML 150 → 58 KB.',
        'The rebuild is ready in a test environment; launch is pending.',
      ],
      links: [],
      diagram: {
        kind: 'metrics',
        caption: 'CLS: live site, after the remediation. Lighthouse and HTML size: the rebuild, in its test environment.',
        metrics: [
          { label: 'Desktop CLS (live site)', before: 0.347, after: 0, scaleMax: 0.4, betterWhen: 'lower' },
          { label: 'Lighthouse score (rebuild)', before: 78, after: 97, scaleMax: 100, betterWhen: 'higher' },
          { label: 'HTML size in KB (rebuild)', before: 150, after: 58, scaleMax: 160, betterWhen: 'lower' },
        ],
      },
    },
    {
      slug: 'multi-brand-catalog-sync',
      title: 'Multi-brand catalogue sync',
      context: 'FU-SHA DOOEL · B2B contract',
      role: 'Founder & lead full-stack engineer',
      period: 'Apr 2024 – Oct 2026',
      summary:
        'Directus Flows that pull products, providers and categories from external servers and aggregator APIs into a multi-brand online platform.',
      headline: '3,000+ products for 4 brands, synced by Directus Flows',
      problem:
        'A multi-brand online platform needed products, providers and categories from external servers and aggregator APIs in its Directus collections, in one consistent data model.',
      built: [
        'Directus Flows that fetch products, providers and categories from external servers and aggregator APIs and write them into the platform’s collections.',
        'Normalised the Directus data model: unified product, provider and category collections with a consistent snake_case schema.',
        'Modelled many-to-many product–category relations.',
        'Documented the fields for the team.',
      ],
      stack: ['Directus 11', 'Directus Flows', 'Data modelling', 'Aggregator APIs'],
      outcomes: [
        '3,000+ products for 4 brands, fed from external servers and aggregator APIs.',
        'One normalised, documented schema for products, providers and categories.',
      ],
      links: [],
      diagram: {
        kind: 'flow',
        caption: 'External data flows through Directus to every brand.',
        columns: [
          { title: 'Sources', items: ['External servers', 'Aggregator APIs'] },
          { title: 'Directus', items: ['Flows: fetch & map', 'Products · providers · categories'] },
          { title: 'Brands', items: ['4 brands'] },
        ],
      },
    },
    {
      slug: 'mojauto',
      title: 'Mojauto',
      context: 'Client project · North Macedonia',
      role: 'Full-stack build',
      summary: 'Car-listings marketplace for North Macedonia, in Macedonian and Albanian.',
      headline: 'Hand-built auth, idempotent NestPay payments, one-command deploys with rollback',
      problem:
        'A car-listings marketplace for North Macedonia, in Macedonian and Albanian, with its own sign-in, card payments through a local bank and image storage.',
      built: [
        'Next.js 16 app on Drizzle and PostgreSQL.',
        'Hand-built Google OAuth, signed sessions and email OTP.',
        'Halkbank NestPay payments with idempotency.',
        'Image storage on S3/R2.',
        'One-command deploys with automatic rollback.',
      ],
      stack: ['Next.js 16', 'Drizzle', 'PostgreSQL', 'Google OAuth', 'NestPay', 'S3 / R2'],
      outcomes: [
        'A marketplace in two languages: Macedonian and Albanian.',
        'Idempotent card payments through Halkbank NestPay.',
        'One-command deploys with automatic rollback.',
      ],
      links: [{ label: 'mojauto.mk', href: 'https://mojauto.mk' }],
      diagram: {
        kind: 'flow',
        caption: 'Simplified: sign-in, the app and the services behind it.',
        columns: [
          { title: 'Sign-in', items: ['Google OAuth', 'Email OTP', 'Signed sessions'] },
          { title: 'App', items: ['Next.js 16', 'Drizzle · PostgreSQL'] },
          { title: 'Services', items: ['Halkbank NestPay', 'S3 / R2 images'] },
        ],
      },
    },
    {
      slug: 'glocal-spectrum',
      title: 'Glocal Spectrum',
      context: 'Client project',
      role: 'Full-stack build',
      summary: 'Publication archive and interactive map atlas.',
      headline: 'PostGIS map atlas and fuzzy-searchable archive in resource-limited containers',
      problem: 'A searchable publication archive and an interactive map atlas, running in resource-limited Docker containers.',
      built: [
        'Next.js 16 app on PostgreSQL with PostGIS for the atlas.',
        'Fuzzy search with pg_trgm.',
        'Interactive maps with MapLibre.',
        'Resource-limited Docker containers, with scripted deploys and rollback.',
      ],
      stack: ['Next.js 16', 'PostgreSQL', 'PostGIS', 'pg_trgm', 'MapLibre', 'Docker'],
      outcomes: [
        'Publication archive with fuzzy search (pg_trgm).',
        'Interactive map atlas on MapLibre and PostGIS.',
        'Scripted deploys with rollback.',
      ],
      links: [{ label: 'glocalspectrum.net', href: 'https://glocalspectrum.net' }],
      diagram: {
        kind: 'flow',
        caption: 'One Next.js app over PostgreSQL serves both the archive and the atlas.',
        columns: [
          { title: 'Data', items: ['PostgreSQL', 'PostGIS', 'pg_trgm'] },
          { title: 'App', items: ['Next.js 16'] },
          { title: 'Views', items: ['Publication archive', 'Map atlas (MapLibre)'] },
        ],
      },
    },
    {
      slug: 'ai-automation',
      title: 'AI content pipeline & agentic coding',
      context: 'Own tooling',
      role: 'Design & build',
      summary:
        'A self-hosted n8n pipeline (~195 nodes) that researches, writes, reviews and publishes blog posts, plus the agentic workflow I code with.',
      headline: '~195-node n8n pipeline with an evidence check, QA and human approval gates',
      problem:
        'Publish researched blog posts for my products without writing each one by hand, but never without a human approving it. And use AI coding agents on real repositories with predictable, safe behaviour.',
      built: [
        'Self-hosted n8n workflow (~195 nodes) on a Hetzner VPS that researches, writes, reviews and publishes posts for both products.',
        'SearXNG and Tavily research with an evidence check, a five-step LLM chain, final QA, Telegram approval gates and a publish safety gate.',
        'Local LLM setup: Qwen on Ollama.',
        'Agentic development workflow for Claude Code and Codex CLI: custom skills, subagents, deterministic safety hooks, and planning state kept outside the repositories.',
      ],
      stack: ['n8n', 'SearXNG', 'Tavily', 'LLM APIs', 'Telegram', 'Hetzner', 'Ollama', 'Qwen', 'Claude Code', 'Codex CLI'],
      outcomes: [
        'Every post passes research with an evidence check, QA and Telegram approval before the publish safety gate.',
        'Coding agents run under deterministic safety hooks, with planning state kept outside the repos.',
      ],
      links: [],
      diagram: {
        kind: 'flow',
        caption: 'The n8n content pipeline, simplified from ~195 nodes.',
        columns: [
          { title: 'Research', items: ['SearXNG · Tavily', 'Evidence check'] },
          { title: 'Write', items: ['Five-step LLM chain'] },
          { title: 'Review', items: ['Final QA'] },
          { title: 'Approve', items: ['Telegram gate'] },
          { title: 'Publish', items: ['Safety gate'] },
        ],
      },
    },
  ],

  // Projects without CV facts yet. Never rendered.
  draftProjects: [],

  experience: [
    {
      org: 'FU-SHA DOOEL',
      orgNote: 'Own company, North Macedonia · B2B contract for a multi-brand online platform, remote',
      role: 'Founder & Lead Full-Stack Engineer',
      start: '2024-04',
      end: '2026-10',
      highlights: [
        'Built Directus Flows that fetch products, providers and categories from external servers and aggregator APIs for a multi-brand setup (3,000+ products, 4 brands).',
        'Normalised the Directus data model and documented it for the team.',
      ],
      projectSlugs: ['multi-brand-catalog-sync'],
    },
    {
      org: 'Laigo GmbH & related businesses',
      orgNote: 'Friedrichshafen, Germany · freelance 2020–2022 and since 2025; employee at Laigo’s Skopje company 2022–2025',
      role: 'Software Developer',
      start: '2020-04',
      end: 'present',
      highlights: [
        'Lead frontend developer of the Laigo API Platform (2023–2025), an AI document-processing SaaS: ~60% of 1,300 commits, Keycloak OIDC login, Stripe and Braintree checkout.',
        'Laigo identity service (Keycloak, 2022–2025): custom login, registration, account and email themes from Figma, a v2 redesign, German and Macedonian translations and accessibility fixes.',
        'laigo.ai: WordPress remediation through scripted releases with tested rollbacks (desktop CLS 0.347 → 0), then a Next.js 16 and Payload CMS 3 rebuild (Lighthouse 78 → 97).',
        'E-commerce and websites for related businesses: WooCommerce EU withdrawal-rights and order-restriction plugins (211 unit checks), a fail-closed fix for a payment-settlement bug, a PrestaShop redesign with custom Symfony modules, and a WordPress site replaced with a static one.',
      ],
      projectSlugs: ['laigo-api-platform', 'laigo-ai-rebuild'],
    },
    {
      org: 'StrongEsim',
      orgNote: 'Co-founded eSIM business',
      role: 'Co-founder & Full-Stack Engineer',
      start: '2023',
      end: 'present',
      highlights: [
        'Designed the eSIM API over four providers with fallback, a prepaid wallet and credit ledger, and Swagger docs.',
        'Built the B2B partner portal and the B2C store on one API (3,000+ eSIM products), and the React Native app, live on Google Play and the App Store.',
      ],
      projectSlugs: ['strongesim'],
    },
    {
      org: 'Technoperia',
      role: 'Angular Front-End Developer',
      start: '2019-11',
      end: '2020-04',
      highlights: ['Built an Angular admin dashboard with Chart.js charts, code splitting and lazy loading.'],
      projectSlugs: [],
    },
  ],

  education: {
    degree: 'Bachelor of Computer Science (Honours), Software Engineering',
    school: 'Multimedia University',
    location: 'Cyberjaya, Malaysia',
    year: '2019',
  },

  skills: [
    { group: 'Frontend', items: ['TypeScript', 'React 19', 'Next.js 16 (App Router, SSR)', 'Vue 3', 'Angular', 'Redux Toolkit', 'Tailwind CSS'] },
    { group: 'Backend & APIs', items: ['Node.js', 'Express', 'PHP/Symfony', 'REST', 'GraphQL', 'WebSockets', 'BullMQ', 'OpenAPI', 'Zod'] },
    { group: 'Data', items: ['PostgreSQL (incl. PostGIS)', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Prisma', 'Drizzle', 'Sequelize'] },
    {
      group: 'CMS & Commerce',
      items: ['Directus 11 (Flows, data modelling)', 'Payload CMS 3', 'WordPress', 'WooCommerce', 'Elementor', 'PrestaShop', 'Shopify API'],
    },
    { group: 'Payments & Auth', items: ['Stripe', 'PayPal', 'Braintree', 'Paddle', 'NestPay', 'Keycloak', 'OAuth 2.0/OIDC', 'JWT'] },
    {
      group: 'AI & Automation',
      items: ['n8n', 'LLM APIs with SSE streaming (OpenAI, Anthropic, Gemini, Groq)', 'Local embeddings (Transformers.js)', 'Ollama (Qwen)', 'Claude Code', 'Codex CLI'],
    },
    { group: 'DevOps', items: ['Docker', 'Traefik', 'Nginx', 'Caddy', 'GitHub Actions', 'GitLab CI', 'Linux', 'Hetzner', 'Cloudflare', 'Vercel'] },
    { group: 'Mobile & Testing', items: ['React Native', 'Flutter', 'Jest', 'Vitest', 'React Testing Library', 'Playwright', 'Cypress'] },
    { group: 'Languages', items: ['Turkish (native)', 'English (fluent)', 'Macedonian (fluent)'] },
  ],

  products: [
    {
      name: 'Tansira',
      status: 'launching-soon',
      description:
        'Offline-first, privacy-first blood-pressure tracker for iOS and Android, with four clinical guideline systems and family sharing.',
      stack: ['React Native', 'Feature-Sliced Design', 'SQLCipher (SQLite)', 'Firebase (opt-in sync)', 'HealthKit', 'Health Connect'],
    },
    {
      name: 'Educational Corner',
      status: 'launching-soon',
      description:
        'Self-hosted multilingual publishing platform for psychology and education articles, with per-language publishing rules, RTL support and full SEO.',
      stack: ['Next.js 16', 'React 19', 'TypeScript', 'Directus 11', 'PostgreSQL', 'Playwright', 'axe-core'],
    },
  ],
};
