import { z } from 'zod'

export const logInValidation = z.object({
    email: z.string().email({ message: 'Please enter a valid email id' }),
    password: z.string()
        .min(6, { message: 'Password length should be greater than 6 characters' })
        .max(20, { message: 'Password should not exceed 20 characters' })
        .refine(value => /[A-Z]/.test(value), {
            message: 'Password must contain at least one uppercase letter'
        })
        .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: 'Password must contain at least one special character'
        })
})
