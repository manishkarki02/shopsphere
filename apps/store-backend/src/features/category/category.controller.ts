import httpStatus from "http-status";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import { ApiResponse } from "@/common/utils/response.util";
import * as categoryService from "./category.service";
import type {
	AddCategorySchema,
	DeleteCategorySchema,
	UpdateCategorySchema,
} from "./validation/category.validation";

export const addCategory: ValidatedRequestHandler<AddCategorySchema> = async (
	req,
	res,
) => {
	const category = await categoryService.addCategory(req.body, req.file);
	return ApiResponse.success(res, httpStatus.CREATED, {
		message: "Category created successfully",
		data: category,
	});
};

export const updateCategory: ValidatedRequestHandler<
	UpdateCategorySchema
> = async (req, res) => {
	const category = await categoryService.updateCategory(
		req.params.id,
		req.body,
		req.file,
	);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Category updated successfully",
		data: category,
	});
};

export const getCategories: ValidatedRequestHandler = async (req, res) => {
	const categories = await categoryService.getCategories();
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Categories fetched successfully",
		data: categories,
	});
};

export const deleteCategory: ValidatedRequestHandler<
	DeleteCategorySchema
> = async (req, res) => {
	await categoryService.deleteCategory(req.params.id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Category deleted successfully",
	});
};
