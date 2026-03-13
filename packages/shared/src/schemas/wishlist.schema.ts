import { z } from "zod";
import { objectIdSchema } from "./common.schema";

export const addWishlistBodySchema = z.object({
    productId: objectIdSchema,
});

export type AddWishlistBody = z.infer<typeof addWishlistBodySchema>;
