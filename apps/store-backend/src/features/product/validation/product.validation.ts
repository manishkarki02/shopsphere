import {
	type CreateProductBody,
	createProductBodySchema,
	objectIdSchema,
	queryValidationSchema,
	type UpdateProductBody,
	type UpdateProductStatusBody,
	updateProductBodySchema,
	updateProductStatusBodySchema,
} from "@shop-sphere/shared";
import { z } from "zod/v4";

// ========== Create ==========

export const createProductRequestSchema = z.object({
	body: createProductBodySchema as unknown as z.ZodType<CreateProductBody>,
});
export type CreateProductRequestSchema = z.infer<
	typeof createProductRequestSchema
>;

// ========== Read ==========

export const getProductsRequestSchema = z.object({
	query: queryValidationSchema,
});
export type GetProductsRequestSchema = z.infer<typeof getProductsRequestSchema>;

export const getProductRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});
export type GetProductRequestSchema = z.infer<typeof getProductRequestSchema>;

// ========== Update ==========

export const updateProductRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
	body: updateProductBodySchema as unknown as z.ZodType<UpdateProductBody>,
});
export type UpdateProductRequestSchema = z.infer<
	typeof updateProductRequestSchema
>;

export const updateProductStatusRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
	body: updateProductStatusBodySchema as unknown as z.ZodType<UpdateProductStatusBody>,
});
export type UpdateProductStatusRequestSchema = z.infer<
	typeof updateProductStatusRequestSchema
>;

// ========== Delete ==========

export const deleteProductRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});
export type DeleteProductRequestSchema = z.infer<
	typeof deleteProductRequestSchema
>;
