import { z } from 'zod';

export const AuthResponseSchema = z.object({
    token: z.string(),
    username: z.string(),
  });
  
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
