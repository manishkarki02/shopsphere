import {
	addAllToCartBodySchema,
	addCartBodySchema,
	objectIdSchema,
	updateCartBodySchema,
} from "@shop-sphere/shared";
import { z } from "zod/v4";

// ========== Create ==========

export const addCartRequestSchema = z.object({
	body: addCartBodySchema,
});

export const addAllToCartRequestSchema = z.object({
	body: addAllToCartBodySchema,
});

// ========== Update ==========

export const updateCartRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
	body: updateCartBodySchema,
});

// ========== Delete ==========

export const deleteCartRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});

export type AddCartRequestSchema = z.infer<typeof addCartRequestSchema>;
export type AddAllToCartRequestSchema = z.infer<
	typeof addAllToCartRequestSchema
>;
export type UpdateCartRequestSchema = z.infer<typeof updateCartRequestSchema>;
export type DeleteCartRequestSchema = z.infer<typeof deleteCartRequestSchema>;
