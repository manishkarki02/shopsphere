import z from "zod/v4";
import { LIMIT, PAGE, SORTING_ORDER } from "./common.constant";

export const objectIdSchema = z
	.string()
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const paginationQuerySchema = z.object({
	page: z.coerce.number().positive().default(PAGE),
	limit: z.coerce.number().positive().max(100).default(LIMIT),
	sortBy: z.string().optional(),
	sortOrder: z.enum(Object.values(SORTING_ORDER)).default(SORTING_ORDER.desc),
});

export const queryValidationSchema = z.object({
	...paginationQuerySchema.shape,
	search: z.string().optional(),
});
