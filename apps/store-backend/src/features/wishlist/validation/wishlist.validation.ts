import { addWishlistBodySchema, type AddWishlistBody } from "@shop-sphere/shared";
import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z
	.string()
	.refine((val) => mongoose.Types.ObjectId.isValid(val), {
		message: "Invalid Mongoose ObjectId",
	});

export const addWishlistSchema = z.object({
	body: addWishlistBodySchema as unknown as z.ZodType<AddWishlistBody>,
});

export const deleteWishlistSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});

export type AddWishlistSchema = AddWishlistBody;
