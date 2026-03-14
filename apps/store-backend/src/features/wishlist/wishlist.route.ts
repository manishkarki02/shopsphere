import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { requireRole } from "@/common/middlewares/token.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import {
	addWishlistSchema,
	deleteWishlistSchema,
} from "./validation/wishlist.validation";
import * as wishlistController from "./wishlist.controller";

const router: Router = express.Router();

router.post(
	"/",
	jwtAuthMiddleware,
	requireRole(["CUSTOMER", "STAFF", "ADMIN"]),
	validatorMiddleware(addWishlistSchema),
	catchAsync(wishlistController.addWishlist),
);

router.get(
	"/",
	jwtAuthMiddleware,
	requireRole(["CUSTOMER", "STAFF", "ADMIN"]),
	catchAsync(wishlistController.getWishlists),
);

router.delete(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["CUSTOMER", "STAFF", "ADMIN"]),
	validatorMiddleware(deleteWishlistSchema),
	catchAsync(wishlistController.deleteWishlist),
);

export default router;
