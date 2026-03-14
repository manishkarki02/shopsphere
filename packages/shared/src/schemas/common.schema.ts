import { z } from "zod";

export const objectIdSchema = z
	.string()
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const paginationQuerySchema = z.object({
	page: z.coerce.number().positive().default(1),
	limit: z.coerce.number().positive().max(100).default(10),
	search: z.string().optional(),
	category: z.string().optional(),
	sortBy: z.string().optional(),
	sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
