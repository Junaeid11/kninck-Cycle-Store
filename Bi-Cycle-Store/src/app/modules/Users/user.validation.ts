
import { z } from 'zod';
const userValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255)
  })
})

export const validation = userValidationSchema