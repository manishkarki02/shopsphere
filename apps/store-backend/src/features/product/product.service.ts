import type { IProduct, IProductResponse } from "@shop-sphere/shared";
import httpStatus from "http-status";
import { applyQueryFeatures } from "@/common/utils/query.utils";
import { ApiError } from "@/common/utils/response.util";
import Environment from "@/configs/env";
import { type IProductDocument, Product } from "./product.model";
import type {
	CreateProductRequestSchema,
	GetProductsRequestSchema,
	UpdateProductRequestSchema,
	UpdateProductStatusRequestSchema,
} from "./validation/product.validation";

// ------------- Create a Product --------------
export async function createProduct(
	body: CreateProductRequestSchema["body"],
	files: Express.Multer.File[],
) {
	const images =
		files?.map((file) => {
			return `${Environment.get("SERVER_URL") || "http://localhost:5000"}/${file.path}`;
		}) || [];

	if (images.length === 0) {
		throw new ApiError(httpStatus.BAD_REQUEST, {
			message: "Please insert atleast 1 image",
		});
	}

	const thumbnail = images[0];

	const productRepeated = await Product.findOne({
		productName: body.productName,
	});

	if (productRepeated) {
		throw new ApiError(httpStatus.CONFLICT, {
			message: "Product already exists in database",
		});
	}

	const newProduct = await Product.create({
		...body,
		thumbnail,
		images,
	});

	return newProduct.toObject() as IProductResponse;
}

// ------------- Get All Products --------------
export async function getProducts(query: GetProductsRequestSchema["query"]) {
	return await applyQueryFeatures<IProductDocument, IProductResponse>(
		Product,
		{},
		query,
		{
			fieldsToSearch: ["productName", "description"],
		},
	);
}

// ------------- Get Product by ID --------------
export async function getProductById(id: string) {
	const product = await Product.findById(id).lean<IProductResponse>();
	if (!product) {
		throw new ApiError(httpStatus.NOT_FOUND, { message: "Product not found." });
	}
	return product;
}

// ------------- Update Product Details --------------
export async function updateProduct(
	id: string,
	body: UpdateProductRequestSchema["body"],
	files?: Express.Multer.File[],
) {
	const updateData: Partial<IProduct> = { ...body };

	if (files && files.length > 0) {
		const images = files.map((file) => {
			return `${Environment.get("SERVER_URL") || "http://localhost:5000"}/${file.path}`;
		});
		updateData.images = images;
	}

	const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
		new: true,
	}).lean<IProductResponse>();

	if (!updatedProduct) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, {
			message: "Failed to update product.",
		});
	}

	return updatedProduct;
}

// ------------- Update Product Status --------------
export async function updateProductStatus(
	id: string,
	body: UpdateProductStatusRequestSchema["body"],
) {
	const updatedProduct = await Product.findByIdAndUpdate(
		id,
		{ isActive: body.isActive },
		{ new: true },
	).lean<IProductResponse>();

	if (!updatedProduct) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, {
			message: "Failed to update product status.",
		});
	}

	return updatedProduct;
}

// ------------- Delete a Product --------------
export async function deleteProduct(id: string) {
	const deletedProduct = await Product.findByIdAndDelete(id);

	if (!deletedProduct) {
		throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, {
			message: "Failed to delete product",
		});
	}

	return null;
}
