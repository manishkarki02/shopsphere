import {
	paginationQuerySchema,
	objectIdSchema as sharedObjectIdSchema,
} from "@shop-sphere/shared";
import mongoose from "mongoose";
import { z } from "zod";

// Validate MongoDB ObjectId
export const objectIdSchema = z
	.string()
	.refine((val) => mongoose.Types.ObjectId.isValid(val), {
		message: "Invalid ObjectId",
	});

// Common pagination query params
export const paginationSchema = paginationQuerySchema;

// Common params with ID
export const idParamSchema = z.object({
	params: z.object({
		id: objectIdSchema,
	}),
});
