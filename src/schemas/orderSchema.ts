import {z} from 'zod';

export const orderValidation = z.object({
    items : z.string().array(),
    orderBy : z.string(),
    amount : z.string(),
})