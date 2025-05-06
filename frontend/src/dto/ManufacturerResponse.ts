import { z } from 'zod';

export const ManufacturerResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type ManufacturerResponse = z.infer<typeof ManufacturerResponseSchema>;