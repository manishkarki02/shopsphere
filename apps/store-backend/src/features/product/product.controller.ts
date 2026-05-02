import httpStatus from "http-status";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import { ApiResponse } from "@/common/utils/response.util";
import * as productService from "./product.service";
import type {
	CreateProductRequestSchema,
	DeleteProductRequestSchema,
	GetProductRequestSchema,
	UpdateProductRequestSchema,
	UpdateProductStatusRequestSchema,
} from "./validation/product.validation";

// ========== Create ==========
export const createProduct: ValidatedRequestHandler<
	CreateProductRequestSchema
> = async (req, res) => {
	// files would be populated by multer middleware
	const files = req.files as Express.Multer.File[];
	const product = await productService.createProduct(req.body, files);
	return ApiResponse.success(res, httpStatus.CREATED, {
		message: "Product created successfully",
		data: product,
	});
};

// ========== Read ==========
export const getProducts: ValidatedRequestHandler = async (req, res) => {
	const products = await productService.getProducts(req.query);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Products fetched successfully",
		data: products,
	});
};

export const getProductById: ValidatedRequestHandler<
	GetProductRequestSchema
> = async (req, res) => {
	const product = await productService.getProductById(req.params.id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Product fetched successfully.",
		data: product,
	});
};

// ========== Update ==========
export const updateProduct: ValidatedRequestHandler<
	UpdateProductRequestSchema
> = async (req, res) => {
	const files = req.files as Express.Multer.File[];
	const product = await productService.updateProduct(
		req.params.id,
		req.body,
		files,
	);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Product updated successfully",
		data: product,
	});
};

export const updateProductStatus: ValidatedRequestHandler<
	UpdateProductStatusRequestSchema
> = async (req, res) => {
	const product = await productService.updateProductStatus(
		req.params.id,
		req.body,
	);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Product status updated successfully",
		data: product,
	});
};

// ========== Delete ==========
export const deleteProduct: ValidatedRequestHandler<
	DeleteProductRequestSchema
> = async (req, res) => {
	await productService.deleteProduct(req.params.id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Product deleted Successfully",
	});
};
