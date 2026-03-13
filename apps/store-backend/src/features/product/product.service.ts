import httpStatus from "http-status";
import { Product } from "./product.model";
import { ApiError } from "@/common/utils/response.util";
import Environment from "@/configs/env";
import type { CreateProductSchema, UpdateProductSchema } from "./validation/product.validation";

export async function createProduct(body: CreateProductSchema, files: Express.Multer.File[]) {
    const images = files?.map((file) => {
        return `${Environment.get("SERVER_URL") || "http://localhost:5000"}/${file.path}`;
    }) || [];

    if (images.length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, { message: "Please insert atleast 1 image" });
    }

    const thumbnail = images[0];

    const productRepeated = await Product.findOne({ productName: body.productName });

    if (productRepeated) {
        throw new ApiError(httpStatus.CONFLICT, { message: "Product already exists in database" });
    }

    const newProduct = await Product.create({
        ...body,
        thumbnail,
        images,
    });

    return newProduct;
}

export async function getProducts(query: any) {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    if (!products) {
        throw new ApiError(httpStatus.NOT_FOUND, { message: "No products in database" });
    }

    return products;
}

export async function getProductById(id: string) {
    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, { message: "Product not found." });
    }
    return product;
}

export async function updateProduct(id: string, body: UpdateProductSchema, files?: Express.Multer.File[]) {
    const updateData: any = { ...body };

    if (files && files.length > 0) {
        const images = files.map((file) => {
             return `${Environment.get("SERVER_URL") || "http://localhost:5000"}/${file.path}`;
        });
        updateData.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedProduct) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, { message: "Failed to update product." });
    }

    return updatedProduct;
}

export async function deleteProduct(id: string) {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, { message: "Failed to delete product" });
    }
    
    return null;
}
