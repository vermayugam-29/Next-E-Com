import { z } from 'zod';

export const signUpValidation = z.object({
    // image : z.string().url(),

    firstName: z.string().max(20, { message: 'First Name cannot exceed 20 characters' }),
    lastName : z.string().max(20, { message: 'Last Name cannot exceed 20 characters' }),
    
    email: z.string().email({message : 'Please enter a valid email id'}),

    password: z.string()
        .min(6, { message: 'Password length should be greater than 6 characters' })
        .max(20, { message: 'Password should not exceed 20 characters' })
        .refine(value => /[A-Z]/.test(value), {
            message: 'Password must contain at least one uppercase letter'
        })
        .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: 'Password must contain at least one special character'
        })
});
