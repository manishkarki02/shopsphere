import { z } from "zod";

export const updateOrderStatusBodySchema = z.object({
	status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

export type UpdateOrderStatusBody = z.infer<typeof updateOrderStatusBodySchema>;
