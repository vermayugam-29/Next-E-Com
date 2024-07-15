import  { z } from 'zod';

export const addressValidation = z.object({
    name : z.string(),
    phoneNumber : z.string(),
    houseNo : z.string(),
    landmark : z.string(),
    city : z.string(),
    state : z.string(),
    pincode : z.number().refine(value => {
        const val = value.toString();
        return val.length === 6;
    } , {
        message : 'Please enter a vlaid pincode'
    })
})