import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const clientes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/clientes' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image().optional(),
      order: z.number().default(0),
    }),
});

export const collections = { clientes };
