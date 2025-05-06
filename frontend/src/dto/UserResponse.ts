import { z } from 'zod';

export const UserResponseSchema = z.object({
  username: z.string(),
  bonuses: z.number().optional(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
