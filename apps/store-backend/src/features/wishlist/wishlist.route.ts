import express, { type Router } from "express";
import * as wishlistController from "./wishlist.controller";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { userValidator } from "@/common/middlewares/token.middleware";
import { catchAsync } from "@/common/utils/error.util";
import {
    addWishlistSchema,
    deleteWishlistSchema
} from "./validation/wishlist.validation";

const router: Router = express.Router();

router.post(
    "/",
    jwtAuthMiddleware,
    userValidator,
    validatorMiddleware(addWishlistSchema),
    catchAsync(wishlistController.addWishlist)
);

router.get(
    "/",
    jwtAuthMiddleware,
    userValidator,
    catchAsync(wishlistController.getWishlists)
);

router.delete(
    "/:id",
    jwtAuthMiddleware,
    userValidator,
    validatorMiddleware(deleteWishlistSchema),
    catchAsync(wishlistController.deleteWishlist)
);

export default router;
