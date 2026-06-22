import { SITE } from '@config'
import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
    // type: "content_layer",
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: ({ image }) =>
        z.object({
            author: z.string().default(SITE.author),
            pubDatetime: z.date().default(() => new Date()),
            modDatetime: z.date().optional().nullable(),
            title: z.string(),
            featured: z.boolean().optional(),
            draft: z.boolean().optional(),
            tags: z.array(z.string()).default(['others']),
            ogImage: image()
                .refine(img => img.width >= 1200 && img.height >= 630, {
                    message:
                        'OpenGraph image must be at least 1200 X 630 pixels!',
                })
                .or(z.string())
                .optional(),
            description: z.string(),
            canonicalURL: z.string().optional(),
        }),
})

const note = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/note' }),
    schema: ({ image }) =>
        z.object({
            author: z.string().default(SITE.author),
            pubDatetime: z.date().default(() => new Date()),
            modDatetime: z.date().optional().nullable(),
            title: z.string(),
            featured: z.boolean().optional(),
            draft: z.boolean().optional(),
            tags: z.array(z.string()).default(['others']),
            ogImage: image()
                .refine(img => img.width >= 1200 && img.height >= 630, {
                    message:
                        'OpenGraph image must be at least 1200 X 630 pixels!',
                })
                .or(z.string())
                .optional(),
            description: z.string(),
            canonicalURL: z.string().optional(),
        }),
})

const bibleStudy = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/bible-study' }),
    schema: z.object({
        book_id: z.number(),
        book_name_thai: z.string(),
        book_name_english: z.string(),
        testament: z.enum(['old', 'new']),
    }),
})

export const collections = { blog, note, bibleStudy }
