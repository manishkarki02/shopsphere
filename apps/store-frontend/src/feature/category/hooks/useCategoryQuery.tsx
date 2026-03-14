import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCustomQuery } from "@/common/hooks/useCustomQuery";
import {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
} from "../category.service";

export const CATEGORY_KEYS = {
	all: ["categories"] as const,
	lists: () => [...CATEGORY_KEYS.all, "list"],
};

export const useGetCategories = () => {
	return useCustomQuery({
		queryKey: CATEGORY_KEYS.lists(),
		queryFn: getCategories,
	});
};

export const useCreateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.lists() });
		},
	});
};

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
			updateCategory(id, formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.lists() });
		},
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.lists() });
		},
	});
};
