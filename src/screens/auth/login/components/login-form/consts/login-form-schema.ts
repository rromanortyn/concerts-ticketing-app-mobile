import z from 'zod'

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
})

export default loginFormSchema
