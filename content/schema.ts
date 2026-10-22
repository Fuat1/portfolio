import { z } from 'zod';

/**
 * Shape of content/site.ts. The Vitest suite (tests/content.test.ts) validates the
 * content against this schema; app code only imports the inferred types, so zod
 * never reaches the browser bundle.
 */

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'kebab-case slug');
const yearMonth = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'YYYY or YYYY-MM');
const httpsUrl = z.url({ protocol: /^https$/ });

export const linkSchema = z.object({ label: text, href: httpsUrl });

/** Generated stand-in for a screenshot: columns of boxes joined by arrows. */
const flowDiagramSchema = z.object({
  kind: z.literal('flow'),
  caption: text,
  columns: z
    .array(z.object({ title: text, items: z.array(text).min(1).max(4) }))
    .min(2)
    .max(5),
});

/** Generated stand-in for a screenshot: before/after bars for measured metrics. */
const metricsDiagramSchema = z.object({
  kind: z.literal('metrics'),
  caption: text,
  metrics: z
    .array(
      z.object({
        label: text,
        before: z.number().nonnegative(),
        after: z.number().nonnegative(),
        /** Upper bound of the bar scale. */
        scaleMax: z.number().positive(),
        betterWhen: z.enum(['higher', 'lower']),
      }),
    )
    .min(1),
});

export const diagramSchema = z.discriminatedUnion('kind', [flowDiagramSchema, metricsDiagramSchema]);

export const projectSchema = z.object({
  slug,
  title: text,
  /** Who it was for, e.g. a client name or "Own product". */
  context: text,
  role: text,
  period: text.optional(),
  /** One line for the card. */
  summary: text,
  /** The single most important outcome, shown on the card. */
  headline: text,
  problem: text,
  built: z.array(text).min(1),
  stack: z.array(text).min(1),
  outcomes: z.array(text).min(1),
  links: z.array(linkSchema),
  diagram: diagramSchema,
  /** Optional real screenshot, shown above the diagram. File lives in public/projects/. */
  screenshot: z
    .object({
      src: z.string().regex(/^\/projects\/[\w-]+\.(png|jpe?g|webp|avif)$/),
      alt: text,
      width: z.number().int().positive(),
      height: z.number().int().positive(),
    })
    .optional(),
});

/** Projects that are named in the brief but have no CV facts yet. Never rendered. */
export const draftProjectSchema = z.object({ slug, title: text, todo: text });

export const experienceSchema = z.object({
  org: text,
  orgNote: text.optional(),
  role: text,
  start: yearMonth,
  end: z.union([yearMonth, z.literal('present')]),
  highlights: z.array(text).min(1),
  projectSlugs: z.array(slug),
});

export const productSchema = z.object({
  name: text,
  status: z.enum(['launching-soon', 'live']),
  description: text.optional(),
  stack: z.array(text),
  href: httpsUrl.optional(),
});

export const siteSchema = z.object({
  url: httpsUrl,
  profile: z.object({
    name: text,
    role: text,
    positioning: text,
    summary: text,
    location: text,
    timezone: text,
    availability: text,
    email: z.email(),
    linkedin: httpsUrl,
    github: httpsUrl,
    cv: z.object({ href: z.literal('/cv.pdf'), fileName: z.string().regex(/^[\w-]+\.pdf$/) }),
  }),
  highlights: z
    .array(z.object({ value: text, label: text, projectSlug: slug }))
    .min(2)
    .max(4),
  projects: z.array(projectSchema).min(1),
  draftProjects: z.array(draftProjectSchema),
  experience: z.array(experienceSchema).min(1),
  education: z.object({ degree: text, school: text, location: text, year: z.string().regex(/^\d{4}$/) }),
  skills: z.array(z.object({ group: text, items: z.array(text).min(1) })).min(1),
  products: z.array(productSchema),
});

export type Link = z.infer<typeof linkSchema>;
export type Diagram = z.infer<typeof diagramSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Product = z.infer<typeof productSchema>;
export type Site = z.infer<typeof siteSchema>;
