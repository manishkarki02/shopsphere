import httpStatus from "http-status";
import { ApiResponse } from "@/common/utils/response.util";
import * as cartService from "./cart.service";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import type { RequestHandler } from "express";

export const addCart: ValidatedRequestHandler<typeof import("./validation/cart.validation").addCartSchema> = async (req, res) => {
    // Assuming user is populated in res.locals by auth middleware
    const user = res.locals.user;
    const cart = await cartService.addCart(user._id, req.body);
    return ApiResponse.success(res, httpStatus.CREATED, {
        message: "Product added to cart successfully",
        data: cart,
    });
};

export const addAllToCart: ValidatedRequestHandler<typeof import("./validation/cart.validation").addAllToCartSchema> = async (req, res) => {
    const user = res.locals.user;
    const cart = await cartService.addAllToCart(user._id, req.body);
    return ApiResponse.success(res, httpStatus.CREATED, {
        message: "All products added to cart successfully",
        data: cart,
    });
};

export const updateCart: ValidatedRequestHandler<typeof import("./validation/cart.validation").updateCartSchema> = async (req, res) => {
     const user = res.locals.user;
     const cart = await cartService.updateCart(user._id, req.params.id, req.body);
     return ApiResponse.success(res, httpStatus.OK, {
         message: "Cart updated successfully",
         data: cart,
     });
};

export const getCarts: RequestHandler = async (req, res) => {
     const user = res.locals.user;
     const carts = await cartService.getCarts(user._id);
     return ApiResponse.success(res, httpStatus.OK, {
         message: "Fetched all products in cart",
         data: carts,
     });
};

export const deleteCart: ValidatedRequestHandler<typeof import("./validation/cart.validation").deleteCartSchema> = async (req, res) => {
     const user = res.locals.user;
     await cartService.deleteCart(user._id, req.params.id);
     return ApiResponse.success(res, httpStatus.OK, {
         message: "product removed from cart successfully",
     });
};
