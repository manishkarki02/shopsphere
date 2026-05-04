import z from "zod/v4";
import { objectIdSchema } from "../common";

export const addWishlistBodySchema = z.object({
	productId: objectIdSchema,
});
