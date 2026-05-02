import z from 'zod'

const signUpSecondStepSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    // 1. Only show min-length error if there's actually text in confirmPassword
    if (confirmPassword.length > 0 && confirmPassword.length < 6) {
      ctx.addIssue({
        code: 'custom',
        message: 'Confirm password must be at least 6 characters',
        path: ['confirmPassword'],
      })
    }

    // 2. Only show mismatch error if both fields meet the length requirement
    // This prevents the mismatch error from popping up too early
    if (
      password.length >= 6 &&
      confirmPassword.length >= 6 &&
      password !== confirmPassword
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export default signUpSecondStepSchema
export type SignUpSecondStepSchema = z.infer<typeof signUpSecondStepSchema>
