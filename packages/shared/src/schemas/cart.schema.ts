import { z } from "zod";
import { objectIdSchema } from "./common.schema";

export const addCartBodySchema = z.object({
    id: objectIdSchema,
    quantity: z.number().optional().default(1),
});

export const addAllToCartBodySchema = z.object({
    productIds: z.array(objectIdSchema),
});

export const updateCartBodySchema = z.object({
    updatedItems: z.array(
        z.object({
            productId: objectIdSchema,
            quantity: z.number().min(1),
        })
    ),
});

export type AddCartBody = z.infer<typeof addCartBodySchema>;
export type AddAllToCartBody = z.infer<typeof addAllToCartBodySchema>;
export type UpdateCartBody = z.infer<typeof updateCartBodySchema>;
