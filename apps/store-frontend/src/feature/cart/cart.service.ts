import type {
	AddAllToCartBody,
	AddCartBody,
	UpdateCartBody,
} from "@shop-sphere/shared";
import type { ApiResponse } from "@/common/types/api-response.type";
import { METHODS } from "@/enums/request-methods.enum";
import createApi from "@/utils/axios";
import type { CartItem } from "./store/cart.store";

const cartApi = createApi("/carts");

export const addToCartApi = async (body: AddCartBody) => {
	const { data } = await cartApi({
		method: METHODS.POST,
		url: "/",
		data: body,
	});
	return data as ApiResponse<CartItem>;
};

export const addAllToCartApi = async (body: AddAllToCartBody) => {
	const { data } = await cartApi({
		method: METHODS.POST,
		url: "/all",
		data: body,
	});
	return data as ApiResponse<CartItem[]>;
};

export const getCartsApi = async () => {
	const { data } = await cartApi({
		method: METHODS.GET,
		url: "/",
	});
	return data as ApiResponse<CartItem[]>;
};

export const updateCartApi = async (id: string, body: UpdateCartBody) => {
	const { data } = await cartApi({
		method: METHODS.PUT,
		url: `/${id}`,
		data: body,
	});
	return data as ApiResponse<CartItem>;
};

export const deleteCartApi = async (id: string) => {
	const { data } = await cartApi({
		method: METHODS.DELETE,
		url: `/${id}`,
	});
	return data as ApiResponse<null>;
};
