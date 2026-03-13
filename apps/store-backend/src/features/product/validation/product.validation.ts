import { z } from "zod";
import mongoose from "mongoose";

import { createProductBodySchema, updateProductBodySchema, objectIdSchema as sharedObjectId } from "@shop-sphere/shared";

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Mongoose ObjectId",
});

export const createProductSchema = z.object({
    body: createProductBodySchema,
});

export const updateProductSchema = z.object({
    params: z.object({ id: objectIdSchema }),
    body: updateProductBodySchema,
});

export const getProductSchema = z.object({
    params: z.object({ id: objectIdSchema }),
});

export const deleteProductSchema = z.object({
    params: z.object({ id: objectIdSchema }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>["body"];
export type UpdateProductSchema = z.infer<typeof updateProductSchema>["body"];
