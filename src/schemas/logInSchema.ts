import {z} from 'zod'

export const logInValidation = z.object({
    email : z.string().email({message : 'Please enter a valid email id'}),
    password : z.string()
})
