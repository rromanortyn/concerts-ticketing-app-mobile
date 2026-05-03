import z from 'zod'

const signUpFirstStepSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required'),
  email: z
    .email('Invalid email'),
})

export default signUpFirstStepSchema
