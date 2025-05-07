import { z } from 'zod';

export const PickupPointSchema = z.object({
  id: z.string().uuid(),
  address: z.string(),
});

export type PickupPoint = z.infer<typeof PickupPointSchema>;
