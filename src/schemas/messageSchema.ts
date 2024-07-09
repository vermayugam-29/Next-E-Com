import {z} from 'zod';

export const messageValidation = z.object({
    chatId : z.string(),
    description : z.string()
})