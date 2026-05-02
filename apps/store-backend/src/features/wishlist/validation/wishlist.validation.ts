import { addWishlistBodySchema } from "@shop-sphere/shared";
import { z } from "zod/v4";
import { objectIdSchema } from "@/common/validations/common.validation";

// ========== Create ==========

export const addWishlistRequestSchema = z.object({
	body: addWishlistBodySchema,
});
export type AddWishlistRequestSchema = z.infer<typeof addWishlistRequestSchema>;

// ========== Delete ==========

export const deleteWishlistRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});
export type DeleteWishlistRequestSchema = z.infer<
	typeof deleteWishlistRequestSchema
>;
