import { z } from "zod";

export const addCategoryBodySchema = z.object({
	categoryName: z.string().min(1, "categoryName is required."),
	description: z.string().min(1, "description is required."),
});

export const updateCategoryBodySchema = z.object({
	categoryName: z.string().optional(),
	description: z.string().optional(),
});

export type AddCategoryBody = z.infer<typeof addCategoryBodySchema>;
export type UpdateCategoryBody = z.infer<typeof updateCategoryBodySchema>;
