import type { updateOrderStatusBodySchema } from "@shop-sphere/shared";
import httpStatus from "http-status";
import type { z } from "zod/v4";
import { ApiError } from "@/common/utils/response.util";
import { Order } from "./order.model";

export async function getAllOrders(query: any) {
	const page = parseInt(query.page as string) || 1;
	const limit = parseInt(query.limit as string) || 20;
	const skip = (page - 1) * limit;

	const [orders, total] = await Promise.all([
		Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
		Order.countDocuments(),
	]);

	return { orders, total };
}

export async function getOrderById(id: string) {
	const order = await Order.findById(id).lean();
	if (!order) {
		throw new ApiError(httpStatus.NOT_FOUND, { message: "Order not found" });
	}
	return order;
}

export async function updateOrderStatus(
	id: string,
	body: z.infer<typeof updateOrderStatusBodySchema>,
) {
	const order = await Order.findByIdAndUpdate(
		id,
		{ status: body.status },
		{ new: true },
	);
	if (!order) {
		throw new ApiError(httpStatus.NOT_FOUND, { message: "Order not found" });
	}
	return order;
}

export async function createOrder(userId: string, body: any) {
	const order = await Order.create({ userId, ...body });
	return order;
}
