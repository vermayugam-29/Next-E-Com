import {z} from 'zod'

export const ratingValidation = z.object({
    ratingStars : z.string().min(1,{message : 'There should be at least 1 start to post the rating'})
                .max(5 , {message : 'Stars cannot exceed 5'})
    ,
    reviewDescription : z.string().max(250 , {message : 'Description must not exceed 250 characters'})
})