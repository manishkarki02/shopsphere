import { z } from "zod";
import { objectIdSchema } from "./common.schema";

export const createProductBodySchema = z.object({
    productName: z.string().min(1, "productName is required."),
    description: z.string().min(1, "description is required."),
    color: z.union([z.string(), z.array(z.string())]).optional(),
    discountPercentage: z.number().optional().or(z.string().regex(/^\d+$/).transform(Number)),
    category: objectIdSchema,
    stockQuantity: z.number().or(z.string().regex(/^\d+$/).transform(Number)),
    rating: z.number().optional().or(z.string().regex(/^\d*\.?\d+$/).transform(Number)),
    reviews: z.any().optional(),
});

export const updateProductBodySchema = z.object({
    productName: z.string().optional(),
    description: z.string().optional(),
    color: z.union([z.string(), z.array(z.string())]).optional(),
    discountPercentage: z.number().optional().or(z.string().regex(/^\d+$/).transform(Number)),
    category: objectIdSchema.optional(),
    stockQuantity: z.number().optional().or(z.string().regex(/^\d+$/).transform(Number)),
    rating: z.number().optional().or(z.string().regex(/^\d*\.?\d+$/).transform(Number)),
    reviews: z.any().optional(),
});

export type CreateProductBody = z.infer<typeof createProductBodySchema>;
export type UpdateProductBody = z.infer<typeof updateProductBodySchema>;
