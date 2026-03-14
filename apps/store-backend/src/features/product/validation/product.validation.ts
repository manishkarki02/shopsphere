import {
	createProductBodySchema,
	objectIdSchema as sharedObjectId,
	updateProductBodySchema,
	updateProductStatusBodySchema,
	type CreateProductBody,
	type UpdateProductBody,
	type UpdateProductStatusBody,
} from "@shop-sphere/shared";
import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z
	.string()
	.refine((val) => mongoose.Types.ObjectId.isValid(val), {
		message: "Invalid Mongoose ObjectId",
	});

export const createProductSchema = z.object({
	body: createProductBodySchema as unknown as z.ZodType<CreateProductBody>,
});

export const updateProductSchema = z.object({
	params: z.object({ id: objectIdSchema }),
	body: updateProductBodySchema as unknown as z.ZodType<UpdateProductBody>,
});

export const updateProductStatusSchema = z.object({
	params: z.object({ id: objectIdSchema }),
	body: updateProductStatusBodySchema as unknown as z.ZodType<UpdateProductStatusBody>,
});

export const getProductSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});

export const deleteProductSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});

export type CreateProductSchema = CreateProductBody;
export type UpdateProductSchema = UpdateProductBody;
export type UpdateProductStatusSchema = UpdateProductStatusBody;
