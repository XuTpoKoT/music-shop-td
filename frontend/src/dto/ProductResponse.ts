import { z } from 'zod';

export const ProductResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  description: z.string(),
  color: z.string(),
  manufacturerName: z.string(),
  imgRef: z.string(),
  characteristics: z.record(z.union([z.string(), z.number()])),
  count: z.number().nullable().optional(),
});

export type ProductResponse = z.infer<typeof ProductResponseSchema>;
