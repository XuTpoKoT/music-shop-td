import { z } from 'zod';

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string(),
    login: z.string(),
    firstname: z.string(),
    surname: z.string(),
    patronymic: z.string()
  })
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
