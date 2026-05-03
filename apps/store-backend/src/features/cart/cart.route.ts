import { Roles } from "@shop-sphere/shared";
import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { requireRole } from "@/common/middlewares/token.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import * as cartController from "./cart.controller";
import {
	addAllToCartRequestSchema,
	addCartRequestSchema,
	deleteCartRequestSchema,
	updateCartRequestSchema,
} from "./validation/cart.validation";

const router: Router = express.Router();

// ========== Create ==========

router.post(
	"/",
	jwtAuthMiddleware,
	requireRole([Roles.CUSTOMER]),
	validatorMiddleware(addCartRequestSchema),
	catchAsync(cartController.addCart),
);

router.post(
	"/all",
	jwtAuthMiddleware,
	requireRole([Roles.CUSTOMER]),
	validatorMiddleware(addAllToCartRequestSchema),
	catchAsync(cartController.addAllToCart),
);

// ========== Read ==========

router.get(
	"/",
	jwtAuthMiddleware,
	requireRole([Roles.CUSTOMER]),
	catchAsync(cartController.getCarts),
);

// ========== Update ==========

router.put(
	"/:id",
	jwtAuthMiddleware,
	requireRole([Roles.CUSTOMER]),
	validatorMiddleware(updateCartRequestSchema),
	catchAsync(cartController.updateCart),
);

// ========== Delete ==========

router.delete(
	"/:id",
	jwtAuthMiddleware,
	requireRole([Roles.CUSTOMER]),
	validatorMiddleware(deleteCartRequestSchema),
	catchAsync(cartController.deleteCart),
);

export default router;
