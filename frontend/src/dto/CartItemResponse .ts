import { z } from 'zod';

export const CartItemResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  imgRef: z.string(),
  count: z.number(),
});

export type CartItemResponse = z.infer<typeof CartItemResponseSchema>;