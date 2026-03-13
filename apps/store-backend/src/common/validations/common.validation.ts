import { z } from "zod";
import mongoose from "mongoose";

import { objectIdSchema as sharedObjectIdSchema, paginationQuerySchema } from "@shop-sphere/shared";

// Validate MongoDB ObjectId
export const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});

// Common pagination query params
export const paginationSchema = paginationQuerySchema;

// Common params with ID
export const idParamSchema = z.object({
    params: z.object({
        id: objectIdSchema,
    }),
});
