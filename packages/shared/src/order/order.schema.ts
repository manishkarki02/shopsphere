import z from "zod/v4";
import { OrderStatus } from "./order.constant";

export const updateOrderStatusBodySchema = z.object({
	status: z.enum(Object.values(OrderStatus)),
});
