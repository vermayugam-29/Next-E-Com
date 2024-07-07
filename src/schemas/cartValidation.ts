import { z } from "zod";

export const cartValidation = z.object({
    itemId: z.string(),
    amount: z.union([z.string(), z.number()])
        .refine(value => {
            const numberValue = typeof value === 'string' ? parseFloat(value) : value;
            return numberValue > 0;
        }, {
            message: "Amount must be greater than zero",
        })
});