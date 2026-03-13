import { z } from "zod";
import mongoose from "mongoose";

import { addCartBodySchema, addAllToCartBodySchema, updateCartBodySchema } from "@shop-sphere/shared";

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Mongoose ObjectId",
});

export const addCartSchema = z.object({
    body: addCartBodySchema,
});

export const addAllToCartSchema = z.object({
    body: addAllToCartBodySchema,
});

export const updateCartSchema = z.object({
    params: z.object({ id: objectIdSchema }),
    body: updateCartBodySchema,
});

export const deleteCartSchema = z.object({
    params: z.object({ id: objectIdSchema }),
});

export type AddCartSchema = z.infer<typeof addCartSchema>["body"];
export type AddAllToCartSchema = z.infer<typeof addAllToCartSchema>["body"];
export type UpdateCartSchema = z.infer<typeof updateCartSchema>["body"];
