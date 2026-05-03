import z from "zod/v4";
import { objectIdSchema } from "../common";

export const createProductBodySchema = z.object({
  productName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "productName is required"
          : "Invalid product name",
    })
    .min(1, "productName is required."),
  description: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "description is required"
        : "Invalid description",
  }).min(1, "description is required."),
  color: z.array(z.string()).optional(),
  price: z.number().or(
    z
      .string()
      .regex(/^\d+(\.\d+)?$/)
      .transform(Number),
  ),
  discountPercentage: z
    .number()
    .optional()
    .or(z.string().regex(/^\d+$/).transform(Number)),
  category: objectIdSchema,
  stockQuantity: z.number().or(z.string().regex(/^\d+$/).transform(Number)),
  rating: z
    .number()
    .optional()
    .or(
      z
        .string()
        .regex(/^\d*\.?\d+$/)
        .transform(Number),
    ),
  reviews: z.any().optional(),
});

export const updateProductBodySchema = z.object({
  productName: z.string().optional(),
  description: z.string().optional(),
  color: z.array(z.string()).optional(),
  price: z
    .number()
    .optional()
    .or(
      z
        .string()
        .regex(/^\d+(\.\d+)?$/)
        .transform(Number),
    ),
  discountPercentage: z
    .number()
    .optional()
    .or(z.string().regex(/^\d+$/).transform(Number)),
  category: objectIdSchema.optional(),
  stockQuantity: z
    .number()
    .optional()
    .or(z.string().regex(/^\d+$/).transform(Number)),
  rating: z
    .number()
    .optional()
    .or(
      z
        .string()
        .regex(/^\d*\.?\d+$/)
        .transform(Number),
    ),
  reviews: z.any().optional(),
});

export const updateProductStatusBodySchema = z.object({
  isActive: z.boolean({
    error: (issue) =>
      issue.input === undefined ? "isActive is required" : "Invalid data",
  }),
});
