import type { RequestHandler } from "express";
import httpStatus from "http-status";
import { ApiResponse } from "@/common/utils/response.util";
import * as orderService from "./order.service";

export const getAllOrders: RequestHandler = async (req, res) => {
	const result = await orderService.getAllOrders(req.query);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Orders fetched successfully",
		data: result,
	});
};

export const getOrderById: RequestHandler = async (req, res) => {
	const order = await orderService.getOrderById(String(req.params.id));
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Order fetched successfully",
		data: order,
	});
};

export const updateOrderStatus: RequestHandler = async (req, res) => {
	const order = await orderService.updateOrderStatus(String(req.params.id), req.body);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Order status updated",
		data: order,
	});
};

export const createOrder: RequestHandler = async (req, res) => {
	const userId = (req as any).user?.id;
	const order = await orderService.createOrder(userId, req.body);
	return ApiResponse.success(res, httpStatus.CREATED, {
		message: "Order placed successfully",
		data: order,
	});
};
