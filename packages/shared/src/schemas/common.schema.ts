import z from "zod/v4";
import { LIMIT, PAGE, SORTING_ORDER } from "../constants";

export const objectIdSchema = z
	.string()
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const paginationQuerySchema = z.object({
	page: z.coerce.number().positive().default(PAGE),
	limit: z.coerce.number().positive().max(100).default(LIMIT),
	sortBy: z.string().optional(),
	sortOrder: z.enum(["asc", "desc"]).default(SORTING_ORDER.desc),
});
export type PaginationQuerySchema = z.infer<typeof paginationQuerySchema>;

export const queryValidationSchema = z.object({
	...paginationQuerySchema.shape,
	search: z.string().optional(),
});
export type QueryValidationSchema = z.infer<typeof queryValidationSchema>;
