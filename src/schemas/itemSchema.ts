import {z} from 'zod';

export const itemValidation = z.object({
    name : z.string().
            max(20,{message : `Name mustn't exceed 20 characters`}),

    price : z.string(),

    stockAvailable : z.number(),

    description : z.string()
                    .min(15 , {message : 'Description should be minimum 15 characters long'})
                    .max(200 , {message : 'Description cannot exceed 200 characters'})
})