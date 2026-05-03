import z from "zod/v4";
import { objectIdSchema } from "../common";

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
		}),
	),
});
