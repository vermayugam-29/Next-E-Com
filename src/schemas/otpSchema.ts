import {z} from 'zod';

export const otpValidation = z.object({
    email : z.string().email({message : 'Please enter a valid email id'}),
})