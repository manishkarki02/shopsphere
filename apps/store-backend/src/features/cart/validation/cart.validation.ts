import {
	addAllToCartBodySchema,
	addCartBodySchema,
	updateCartBodySchema,
	type AddAllToCartBody,
	type AddCartBody,
	type UpdateCartBody,
} from "@shop-sphere/shared";
import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z
	.string()
	.refine((val) => mongoose.Types.ObjectId.isValid(val), {
		message: "Invalid Mongoose ObjectId",
	});

export const addCartSchema = z.object({
	body: addCartBodySchema as unknown as z.ZodType<AddCartBody>,
});

export const addAllToCartSchema = z.object({
	body: addAllToCartBodySchema as unknown as z.ZodType<AddAllToCartBody>,
});

export const updateCartSchema = z.object({
	params: z.object({ id: objectIdSchema }),
	body: updateCartBodySchema as unknown as z.ZodType<UpdateCartBody>,
});

export const deleteCartSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});

export type AddCartSchema = AddCartBody;
export type AddAllToCartSchema = AddAllToCartBody;
export type UpdateCartSchema = UpdateCartBody;
