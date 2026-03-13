import express, { type Router } from "express";
import * as cartController from "./cart.controller";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { userValidator } from "@/common/middlewares/token.middleware";
import { catchAsync } from "@/common/utils/error.util";
import {
    addCartSchema,
    addAllToCartSchema,
    updateCartSchema,
    deleteCartSchema
} from "./validation/cart.validation";

const router: Router = express.Router();

router.post(
    "/",
    jwtAuthMiddleware,
    userValidator,
    validatorMiddleware(addCartSchema),
    catchAsync(cartController.addCart)
);

router.post(
    "/all",
    jwtAuthMiddleware,
    userValidator,
    validatorMiddleware(addAllToCartSchema),
    catchAsync(cartController.addAllToCart)
);

router.get(
    "/",
    jwtAuthMiddleware,
    userValidator,
    catchAsync(cartController.getCarts)
);

router.put(
    "/:id",
    jwtAuthMiddleware,
    userValidator,
    validatorMiddleware(updateCartSchema),
    catchAsync(cartController.updateCart)
);

router.delete(
    "/:id",
    jwtAuthMiddleware,
    userValidator,
    validatorMiddleware(deleteCartSchema),
    catchAsync(cartController.deleteCart)
);

export default router;
