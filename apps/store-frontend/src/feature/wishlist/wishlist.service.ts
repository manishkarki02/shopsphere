import type { AddWishlistBody } from "@shop-sphere/shared";
import type { ApiResponse } from "@/common/types/api-response.type";
import { METHODS } from "@/enums/request-methods.enum";
import type { IProduct } from "@/feature/product/product.service";
import createApi from "@/utils/axios";

const wishlistApi = createApi("/wishlists");

export const addToWishlistApi = async (body: AddWishlistBody) => {
	const { data } = await wishlistApi({
		method: METHODS.POST,
		url: "/",
		data: body,
	});
	return data as ApiResponse<IProduct>;
};

export const getWishlistsApi = async () => {
	const { data } = await wishlistApi({
		method: METHODS.GET,
		url: "/",
	});
	return data as ApiResponse<IProduct[]>;
};

export const deleteWishlistApi = async (productId: string) => {
	const { data } = await wishlistApi({
		method: METHODS.DELETE,
		url: `/${productId}`,
	});
	return data as ApiResponse<null>;
};
