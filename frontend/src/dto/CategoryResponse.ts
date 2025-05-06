import { z } from 'zod';

export const CategoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CategoryResponse = z.infer<typeof CategoryResponseSchema>;