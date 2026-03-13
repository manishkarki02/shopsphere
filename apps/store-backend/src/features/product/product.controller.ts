import httpStatus from "http-status";
import { ApiResponse } from "@/common/utils/response.util";
import * as productService from "./product.service";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import type { RequestHandler } from "express";

export const createProduct: ValidatedRequestHandler<typeof import("./validation/product.validation").createProductSchema> = async (req, res) => {
    // files would be populated by multer middleware
    const files = req.files as Express.Multer.File[];
    const product = await productService.createProduct(req.body, files);
    return ApiResponse.success(res, httpStatus.CREATED, {
        message: "Product created successfully",
        data: product,
    });
};

export const getProducts: RequestHandler = async (req, res) => {
    const products = await productService.getProducts(req.query);
    return ApiResponse.success(res, httpStatus.OK, {
        message: "Products fetched successfully",
        data: products,
    });
};

export const getProductById: ValidatedRequestHandler<typeof import("./validation/product.validation").getProductSchema> = async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    return ApiResponse.success(res, httpStatus.OK, {
        message: "Product fetched successfully.",
        data: product,
    });
};

export const updateProduct: ValidatedRequestHandler<typeof import("./validation/product.validation").updateProductSchema> = async (req, res) => {
    const files = req.files as Express.Multer.File[];
    const product = await productService.updateProduct(req.params.id, req.body, files);
    return ApiResponse.success(res, httpStatus.OK, {
        message: "Product updated successfully",
        data: product,
    });
};

export const deleteProduct: ValidatedRequestHandler<typeof import("./validation/product.validation").deleteProductSchema> = async (req, res) => {
    await productService.deleteProduct(req.params.id);
    return ApiResponse.success(res, httpStatus.OK, {
        message: "Product deleted Successfully",
    });
};
