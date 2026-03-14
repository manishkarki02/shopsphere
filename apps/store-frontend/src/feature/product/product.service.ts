import type { PaginationQuery } from "@shop-sphere/shared";
import type { ApiResponse } from "@/common/types/api-response.type";
import { METHODS } from "@/enums/request-methods.enum";
import createApi from "@/utils/axios";

// We'll define IProduct locally until the shared types are fully integrated
export interface IProduct {
	_id: string;
	productName: string;
	description: string;
	price: number;
	discountPercentage?: number;
	images: string[];
	thumbnail?: string;
	category: string;
	stockQuantity: number;
	rating: number;
	reviews: any[];
	isActive: boolean;
	isNewArrival?: boolean;
	isBestSelling?: boolean;
}

const productApi = createApi("/products");

export const getProducts = async (query?: PaginationQuery) => {
	const {
		data,
	}: { data: ApiResponse<{ products: IProduct[]; total: number }> } =
		await productApi({
			method: METHODS.GET,
			url: "/",
			params: query,
		});
	return data.data;
};

export const getTodaySales = async () => {
	const { data }: { data: ApiResponse<IProduct[]> } = await productApi({
		method: METHODS.GET,
		url: "/flash-sales",
	});
	return data.data;
};

export const getBestSellingProducts = async () => {
	const { data }: { data: ApiResponse<IProduct[]> } = await productApi({
		method: METHODS.GET,
		url: "/best-selling",
	});
	return data.data;
};

export const getNewArrivals = async () => {
	const { data }: { data: ApiResponse<IProduct[]> } = await productApi({
		method: METHODS.GET,
		url: "/new-arrivals",
	});
	return data.data;
};

export const getProductById = async (id: string) => {
	const { data }: { data: ApiResponse<IProduct> } = await productApi({
		method: METHODS.GET,
		url: `/${id}`,
	});
	return data.data;
};

export const createProduct = async (formData: FormData) => {
	const { data }: { data: ApiResponse<IProduct> } = await productApi({
		method: METHODS.POST,
		url: "/",
		data: formData,
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
};

export const updateProduct = async (id: string, formData: FormData) => {
	const { data }: { data: ApiResponse<IProduct> } = await productApi({
		method: METHODS.PUT,
		url: `/${id}`,
		data: formData,
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data;
};

export const updateProductStatus = async (id: string, isActive: boolean) => {
	const { data }: { data: ApiResponse<IProduct> } = await productApi({
		method: METHODS.PATCH,
		url: `/${id}/status`,
		data: { isActive },
	});
	return data.data;
};

export const deleteProduct = async (id: string) => {
	const { data }: { data: ApiResponse<null> } = await productApi({
		method: METHODS.DELETE,
		url: `/${id}`,
	});
	return data;
};
