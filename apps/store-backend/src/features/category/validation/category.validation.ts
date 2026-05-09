import {
	addCategoryBodySchema,
	updateCategoryBodySchema,
} from "@shop-sphere/shared";
import { z } from "zod/v4";
import { objectIdSchema } from "@/common/validations/common.validation";

export const addCategorySchema = z.object({
	body: addCategoryBodySchema,
});

export const updateCategorySchema = z.object({
	params: z.object({ id: objectIdSchema }),
	body: updateCategoryBodySchema,
});

export const deleteCategorySchema = z.object({
	params: z.object({ id: objectIdSchema }),
});

export type AddCategorySchema = z.infer<typeof addCategorySchema>;
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
export type DeleteCategorySchema = z.infer<typeof deleteCategorySchema>;
