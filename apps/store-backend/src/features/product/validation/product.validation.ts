import {
  type CreateProductBody,
  createProductBodySchema,
  objectIdSchema,
  type UpdateProductBody,
  type UpdateProductStatusBody,
  updateProductBodySchema,
  updateProductStatusBodySchema,
} from "@shop-sphere/shared";
import { z } from "zod";

// ============================================================
// CREATE
// ============================================================

export const createProductRequestSchema = z.object({
  body: createProductBodySchema as unknown as z.ZodType<CreateProductBody>,
});
export type CreateProductRequestSchema = z.infer<
  typeof createProductRequestSchema
>;

// ============================================================
// READ
// ============================================================

export const getProductRequestSchema = z.object({
  params: z.object({ id: objectIdSchema }),
});
export type GetProductRequestSchema = z.infer<typeof getProductRequestSchema>;

// ============================================================
// UPDATE
// ============================================================

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

// ============================================================
// DELETE
// ============================================================

export const deleteProductRequestSchema = z.object({
  params: z.object({ id: objectIdSchema }),
});
export type DeleteProductRequestSchema = z.infer<
  typeof deleteProductRequestSchema
>;
