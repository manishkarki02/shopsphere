import { z } from "zod";
import mongoose from "mongoose";

import { addWishlistBodySchema } from "@shop-sphere/shared";

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Mongoose ObjectId",
});

export const addWishlistSchema = z.object({
    body: addWishlistBodySchema,
});

export const deleteWishlistSchema = z.object({
    params: z.object({ id: objectIdSchema }),
});

export type AddWishlistSchema = z.infer<typeof addWishlistSchema>["body"];
