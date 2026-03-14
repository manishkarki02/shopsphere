import type { ApiResponse } from "@/common/types/api-response.type";
import { METHODS } from "@/enums/request-methods.enum";
import createApi from "@/utils/axios";

export interface ICategory {
	_id: string;
	name: string;
	categoryName?: string;
	icon?: string;
}

const categoryApi = createApi("/categories");

export const getCategories = async () => {
	const { data }: { data: ApiResponse<ICategory[]> } = await categoryApi({
		method: METHODS.GET,
		url: "/",
	});
	return data;
};

export const createCategory = async (formData: FormData) => {
	const { data }: { data: ApiResponse<ICategory> } = await categoryApi({
		method: METHODS.POST,
		url: "/",
		data: formData,
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data.data;
};

export const updateCategory = async (id: string, formData: FormData) => {
	const { data }: { data: ApiResponse<ICategory> } = await categoryApi({
		method: METHODS.PATCH,
		url: `/${id}`,
		data: formData,
		headers: { "Content-Type": "multipart/form-data" },
	});
	return data.data;
};

export const deleteCategory = async (id: string) => {
	const { data }: { data: ApiResponse<null> } = await categoryApi({
		method: METHODS.DELETE,
		url: `/${id}`,
	});
	return data.data;
};
