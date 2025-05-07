import { z } from 'zod';

export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  login: z.string(),
  firstname: z.string(),
  surname: z.string(),
  patronymic: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
