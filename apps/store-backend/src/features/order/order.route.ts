import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { requireRole } from "@/common/middlewares/token.middleware";
import { catchAsync } from "@/common/utils/error.util";
import * as orderController from "./order.controller";

const router: Router = express.Router();

// Admin — list all orders
router.get(
	"/",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	catchAsync(orderController.getAllOrders),
);

// Admin — get single order
router.get(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	catchAsync(orderController.getOrderById),
);

// Admin — update order status
router.patch(
	"/:id/status",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	catchAsync(orderController.updateOrderStatus),
);

// Customer — place an order
router.post(
	"/",
	jwtAuthMiddleware,
	catchAsync(orderController.createOrder),
);

export default router;
