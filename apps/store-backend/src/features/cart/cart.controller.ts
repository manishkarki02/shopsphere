import httpStatus from "http-status";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import { ApiResponse } from "@/common/utils/response.util";
import * as cartService from "./cart.service";
import type {
	AddAllToCartRequestSchema,
	AddCartRequestSchema,
	DeleteCartRequestSchema,
	UpdateCartRequestSchema,
} from "./validation/cart.validation";

// ========== Create ==========

export const addCart: ValidatedRequestHandler<AddCartRequestSchema> = async (
	req,
	res,
) => {
	const user = res.locals.user;
	const cart = await cartService.addCart(user._id, req.body);
	return ApiResponse.success(res, httpStatus.CREATED, {
		message: "Product added to cart successfully",
		data: cart,
	});
};

export const addAllToCart: ValidatedRequestHandler<
	AddAllToCartRequestSchema
> = async (req, res) => {
	const user = res.locals.user;
	const cart = await cartService.addAllToCart(user._id, req.body);
	return ApiResponse.success(res, httpStatus.CREATED, {
		message: "All products added to cart successfully",
		data: cart,
	});
};

// ========== Update ==========

export const updateCart: ValidatedRequestHandler<
	UpdateCartRequestSchema
> = async (req, res) => {
	const user = res.locals.user;
	const cart = await cartService.updateCart(user._id, req.body);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Cart updated successfully",
		data: cart,
	});
};

// ========== Read ==========

export const getCarts: ValidatedRequestHandler = async (_req, res) => {
	const user = res.locals.user;
	const carts = await cartService.getCarts(user._id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Fetched all products in cart",
		data: carts,
	});
};

// ========== Delete ==========

export const deleteCart: ValidatedRequestHandler<
	DeleteCartRequestSchema
> = async (req, res) => {
	const user = res.locals.user;
	await cartService.deleteCart(user._id, req.params.id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "product removed from cart successfully",
	});
};
