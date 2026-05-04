import z from "zod/v4";
import { objectIdSchema } from "../common";
import { OrderStatus } from "./order.constant";

export const createOrderBodySchema = z.object({
  shippingAddress: z.string().min(1, "Shipping address is required"),
  items: z.array(
    z.object({
      productId: objectIdSchema,
      productName: z.string().min(1, "Product name is required"),
      price: z.number().min(0, "Price must be a positive number"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      image: z.string().optional(),
    }),
  ),
});

export const updateOrderStatusBodySchema = z.object({
  status: z.enum(Object.values(OrderStatus)),
});
