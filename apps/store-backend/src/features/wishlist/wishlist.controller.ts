import type { RequestHandler } from "express";
import httpStatus from "http-status";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import { ApiResponse } from "@/common/utils/response.util";
import * as wishlistService from "./wishlist.service";

export const addWishlist: ValidatedRequestHandler<
	typeof import("./validation/wishlist.validation").addWishlistSchema
> = async (req, res) => {
	const user = res.locals.user;
	const wishlist = await wishlistService.addWishlist(
		user._id,
		req.body.productId,
	);
	return ApiResponse.success(res, httpStatus.CREATED, {
		message: "Product added to wishlist successfully",
		data: wishlist,
	});
};

export const getWishlists: RequestHandler = async (req, res) => {
	const user = res.locals.user;
	const wishlists = await wishlistService.getWishlists(user._id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Fetched all products from Wishlist",
		data: wishlists,
	});
};

export const deleteWishlist: ValidatedRequestHandler<
	typeof import("./validation/wishlist.validation").deleteWishlistSchema
> = async (req, res) => {
	const user = res.locals.user;
	await wishlistService.deleteWishlist(user._id, req.params.id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "product removed from Wishlist successfully",
	});
};
