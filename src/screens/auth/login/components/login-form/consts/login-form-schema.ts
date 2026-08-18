import z from 'zod'

const loginFormSchema = z.object({
  email: z
    .email('Should be a valid email address'),
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters'),
})

export default loginFormSchema
