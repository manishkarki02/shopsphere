import { z } from "zod";
import mongoose from "mongoose";

import { addCategoryBodySchema, updateCategoryBodySchema } from "@shop-sphere/shared";

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Mongoose ObjectId",
});

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

export type AddCategorySchema = z.infer<typeof addCategorySchema>["body"];
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>["body"];
