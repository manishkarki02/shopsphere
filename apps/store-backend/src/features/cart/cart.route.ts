import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { requireRole } from "@/common/middlewares/token.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import * as cartController from "./cart.controller";
import {
	addAllToCartSchema,
	addCartSchema,
	deleteCartSchema,
	updateCartSchema,
} from "./validation/cart.validation";

const router: Router = express.Router();

router.post(
	"/",
	jwtAuthMiddleware,
	requireRole(["CUSTOMER", "STAFF", "ADMIN"]),
	validatorMiddleware(addCartSchema),
	catchAsync(cartController.addCart),
);

router.post(
	"/all",
	jwtAuthMiddleware,
	requireRole(["CUSTOMER", "STAFF", "ADMIN"]),
	validatorMiddleware(addAllToCartSchema),
	catchAsync(cartController.addAllToCart),
);

router.get(
	"/",
	jwtAuthMiddleware,
	requireRole(["CUSTOMER", "STAFF", "ADMIN"]),
	catchAsync(cartController.getCarts),
);

router.put(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["CUSTOMER", "STAFF", "ADMIN"]),
	validatorMiddleware(updateCartSchema),
	catchAsync(cartController.updateCart),
);

router.delete(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["CUSTOMER", "STAFF", "ADMIN"]),
	validatorMiddleware(deleteCartSchema),
	catchAsync(cartController.deleteCart),
);

export default router;
