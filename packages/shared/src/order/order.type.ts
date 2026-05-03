import type { z } from "zod/v4";
import type { OrderStatus } from "./order.constant";

export type OrderStatusType = z.infer<typeof OrderStatus>;
export interface IOrderItem {
	productId: string;
	productName: string;
	price: number;
	quantity?: number;
	image?: string;
}

export interface IOrderResponse {
	_id: string;
	userId: string;
	items: IOrderItem[];
	status: OrderStatusType;
	totalAmount: number;
	shippingAddress?: string;
	createdAt: string;
	updatedAt: string;
}
