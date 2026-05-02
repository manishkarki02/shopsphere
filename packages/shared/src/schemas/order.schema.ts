import z from "zod/v4";

export const updateOrderStatusBodySchema = z.object({
	status: z.enum([
		"PENDING",
		"PROCESSING",
		"SHIPPED",
		"DELIVERED",
		"CANCELLED",
	]),
});

export type UpdateOrderStatusBody = z.infer<typeof updateOrderStatusBodySchema>;
