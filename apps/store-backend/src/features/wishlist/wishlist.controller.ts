import httpStatus from "http-status";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import { ApiResponse } from "@/common/utils/response.util";
import type {
	AddWishlistRequestSchema,
	DeleteWishlistRequestSchema,
} from "./validation/wishlist.validation";
import * as wishlistService from "./wishlist.service";

// ========== Create ==========

export const addWishlist: ValidatedRequestHandler<
	AddWishlistRequestSchema
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

// ========== Read ==========

export const getWishlists: ValidatedRequestHandler = async (_req, res) => {
	const user = res.locals.user;
	const wishlists = await wishlistService.getWishlists(user._id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Fetched all products from Wishlist",
		data: wishlists,
	});
};

// ========== Delete ==========

export const deleteWishlist: ValidatedRequestHandler<
	DeleteWishlistRequestSchema
> = async (req, res) => {
	const user = res.locals.user;
	await wishlistService.deleteWishlist(user._id, req.params.id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "product removed from Wishlist successfully",
	});
};
