import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
        title: z.string().optional(),
        date: z.any().optional(),
        image: z.string().optional(),
        video: z.string().optional(),
        excerpt: z.string().optional(),
        tags: z.any().optional()
    })
});

export const collections = { 'blog': blogCollection };
