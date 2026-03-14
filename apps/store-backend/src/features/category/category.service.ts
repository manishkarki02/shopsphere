import httpStatus from "http-status";
import { ApiError } from "@/common/utils/response.util";
import Environment from "@/configs/env";
import { Category } from "./category.model";
import type {
	AddCategorySchema,
	UpdateCategorySchema,
} from "./validation/category.validation";

export async function addCategory(
	body: AddCategorySchema,
	file?: Express.Multer.File,
) {
	if (!file) {
		throw new ApiError(httpStatus.BAD_REQUEST, {
			message: "Category icon is required",
		});
	}

	const icon = `${Environment.get("SERVER_URL") || "http://localhost:5000"}/${file.path}`;

	const existingCategory = await Category.findOne({ name: body.categoryName });
	if (existingCategory) {
		throw new ApiError(httpStatus.CONFLICT, {
			message: "Category already exists",
		});
	}

	const newCategory = await Category.create({ name: body.categoryName, icon });
	return newCategory;
}

export async function updateCategory(
	id: string,
	body: UpdateCategorySchema,
	file?: Express.Multer.File,
) {
	const updateData: any = { ...body };

	if (file) {
		updateData.icon = `${Environment.get("SERVER_URL") || "http://localhost:5000"}/${file.path}`;
	}

	const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
		new: true,
	});

	if (!updatedCategory) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, {
			message: "Failed to update category",
		});
	}

	return updatedCategory;
}

export async function getCategories() {
	const categories = await Category.find();
	return categories;
}

export async function deleteCategory(id: string) {
	const deletedCategory = await Category.findByIdAndDelete(id);
	if (!deletedCategory) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, {
			message: "Failed to delete category",
		});
	}
	return null;
}
