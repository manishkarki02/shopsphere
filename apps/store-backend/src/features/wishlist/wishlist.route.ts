import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import {
	addWishlistRequestSchema,
	deleteWishlistRequestSchema,
} from "./validation/wishlist.validation";
import * as wishlistController from "./wishlist.controller";

const router: Router = express.Router();

// ========== Create ==========

router.post(
	"/",
	jwtAuthMiddleware,
	validatorMiddleware(addWishlistRequestSchema),
	catchAsync(wishlistController.addWishlist),
);

// ========== Read ==========

router.get("/", jwtAuthMiddleware, catchAsync(wishlistController.getWishlists));

// ========== Delete ==========

router.delete(
	"/:id",
	jwtAuthMiddleware,
	validatorMiddleware(deleteWishlistRequestSchema),
	catchAsync(wishlistController.deleteWishlist),
);

export default router;
