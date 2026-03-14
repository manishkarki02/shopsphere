import {
	addCategoryBodySchema,
	updateCategoryBodySchema,
	type AddCategoryBody,
	type UpdateCategoryBody,
} from "@shop-sphere/shared";
import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z
	.string()
	.refine((val) => mongoose.Types.ObjectId.isValid(val), {
		message: "Invalid Mongoose ObjectId",
	});

export const addCategorySchema = z.object({
	body: addCategoryBodySchema as unknown as z.ZodType<AddCategoryBody>,
});

export const updateCategorySchema = z.object({
	params: z.object({ id: objectIdSchema }),
	body: updateCategoryBodySchema as unknown as z.ZodType<UpdateCategoryBody>,
});

export const deleteCategorySchema = z.object({
	params: z.object({ id: objectIdSchema }),
});

export type AddCategorySchema = AddCategoryBody;
export type UpdateCategorySchema = UpdateCategoryBody;
