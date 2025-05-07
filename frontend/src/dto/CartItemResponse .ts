import { z } from 'zod';

export const CartItemResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  imgRef: z.string(),
  count: z.number(),
});

export type CartItemResponse = z.infer<typeof CartItemResponseSchema>;