import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { parse } from 'yaml';

// Post types drive the blog filter tabs and the home page sections.
// writing / video / podcast together form "Storytelling".
// indigenous-engagement is a secondary tag shown under Research & Indigenous Engagement.
const POST_TYPES = [
  'case-study',
  'writing',
  'video',
  'podcast',
  'research',
  'speaking',
  'indigenous-engagement',
] as const;

const blog = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        date: z.date(),
        types: z.array(z.enum(POST_TYPES)).nonempty(),
        draft: z.boolean().default(false),
        role: z.string().optional(), // speaking posts: "Moderator", "Speaker", etc.
        skillsTags: z.array(z.string()).default([]),
        heroImage: image().optional(),
        heroImageAlt: z.string().optional(),
        heroVideoId: z.string().optional(),
        excerpt: z.string().min(1),
        featured: z.boolean().default(false),
        featuredRank: z.number().int().min(1).max(4).optional(),
        externalLink: z
          .string()
          .url()
          .optional()
          .or(z.literal(''))
          .transform((v) => (v ? v : undefined)),
      })
      .superRefine((d, ctx) => {
        if (d.heroImage && d.heroVideoId) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Set heroImage OR heroVideoId, not both.',
          });
        }
        if (d.heroImage && !d.heroImageAlt) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'heroImageAlt is required whenever heroImage is set.',
          });
        }
      }),
});

const photos = defineCollection({
  loader: file('./src/data/photos.yaml', {
    parser: (text) =>
      (parse(text) as Record<string, unknown>[]).map((p) => ({ id: p.src, ...p })),
  }),
  schema: z
    .object({
      id: z.string(),
      src: z.string().min(1),
      alt: z.string().min(1, 'Every photo needs descriptive alt text.'),
      category: z.enum(['portrait', 'event']),
      date: z.coerce.date(),
      caption: z.string().optional(),
      flickrAlbum: z.string().url().optional(),
    })
    .superRefine((p, ctx) => {
      if (p.flickrAlbum && p.category !== 'event') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `flickrAlbum is only allowed on event photos (found on "${p.src}", a ${p.category}).`,
        });
      }
    }),
});

export const collections = { blog, photos };
