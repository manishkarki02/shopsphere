import type { RequestHandler } from "express";
import httpStatus from "http-status";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import { ApiResponse } from "@/common/utils/response.util";
import * as categoryService from "./category.service";

export const addCategory: ValidatedRequestHandler<
	typeof import("./validation/category.validation").addCategorySchema
> = async (req, res) => {
	const category = await categoryService.addCategory(req.body, req.file);
	return ApiResponse.success(res, httpStatus.CREATED, {
		message: "Category created successfully",
		data: category,
	});
};

export const updateCategory: ValidatedRequestHandler<
	typeof import("./validation/category.validation").updateCategorySchema
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

export const getCategories: RequestHandler = async (req, res) => {
	const categories = await categoryService.getCategories();
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Categories fetched successfully",
		data: categories,
	});
};

export const deleteCategory: ValidatedRequestHandler<
	typeof import("./validation/category.validation").deleteCategorySchema
> = async (req, res) => {
	await categoryService.deleteCategory(req.params.id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Category deleted successfully",
	});
};
