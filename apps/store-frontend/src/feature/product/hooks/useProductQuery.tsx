import type { PaginationQuery } from "@shop-sphere/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCustomQuery } from "@/common/hooks/useCustomQuery";
import {
	getBestSellingProducts,
	getNewArrivals,
	getProductById,
	getProducts,
	getTodaySales,
	createProduct,
	updateProduct,
	updateProductStatus,
	deleteProduct,
} from "../product.service";

export const PRODUCT_KEYS = {
	all: ["products"] as const,
	lists: () => [...PRODUCT_KEYS.all, "list"],
	list: (filter?: PaginationQuery) => [...PRODUCT_KEYS.lists(), filter],
	details: () => [...PRODUCT_KEYS.all, "detail"],
	detail: (id: string) => [...PRODUCT_KEYS.details(), id],
	todaySales: () => [...PRODUCT_KEYS.all, "today-sales"],
	bestSelling: () => [...PRODUCT_KEYS.all, "best-selling"],
	newArrivals: () => [...PRODUCT_KEYS.all, "new-arrivals"],
};

export const useGetProducts = (queryFilter?: PaginationQuery) => {
	return useCustomQuery({
		queryKey: PRODUCT_KEYS.list(queryFilter),
		queryFn: () => getProducts(queryFilter),
	});
};

export const useAdminProducts = (queryFilter?: PaginationQuery) => {
	// Reusing getProducts for admin view, but can be distinct if needed.
	return useCustomQuery({
		queryKey: [...PRODUCT_KEYS.list(queryFilter), "admin"],
		queryFn: () => getProducts(queryFilter),
	});
};

export const useGetTodaySales = () => {
	return useCustomQuery({
		queryKey: PRODUCT_KEYS.todaySales(),
		queryFn: getTodaySales,
	});
};

export const useGetBestSelling = () => {
	return useCustomQuery({
		queryKey: PRODUCT_KEYS.bestSelling(),
		queryFn: getBestSellingProducts,
	});
};

export const useGetNewArrivals = () => {
	return useCustomQuery({
		queryKey: PRODUCT_KEYS.newArrivals(),
		queryFn: getNewArrivals,
	});
};

export const useGetProductParams = (id: string) => {
	return useCustomQuery({
		queryKey: PRODUCT_KEYS.detail(id),
		queryFn: () => getProductById(id),
		options: {
			enabled: !!id,
		},
	});
};

export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
			updateProduct(id, formData),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
			queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.detail(id) });
		},
	});
};

export const useUpdateProductStatus = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
			updateProductStatus(id, isActive),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
			queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.detail(id) });
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.lists() });
		},
	});
};
