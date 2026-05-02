import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { requireRole } from "@/common/middlewares/token.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import * as userController from "./user.controller";
import {
	createUserRequestSchema,
	deleteUserRequestSchema,
	getAllUsersRequestSchema,
	getUserRequestSchema,
	updateUserRequestSchema,
} from "./validation/user.validation";
import { Roles } from "@shop-sphere/shared";

const router: Router = express.Router();

// ========== Create ==========

router.post(
	"/",
	jwtAuthMiddleware,
	requireRole([Roles.ADMIN]),
	validatorMiddleware(createUserRequestSchema),
	catchAsync(userController.createUser),
);

// ========== Read ==========

router.get(
	"/",
	jwtAuthMiddleware,
	requireRole([Roles.STAFF, Roles.ADMIN]),
	validatorMiddleware(getAllUsersRequestSchema),
	catchAsync(userController.getAllUsers),
);

router.get(
	"/:id",
	jwtAuthMiddleware,
	validatorMiddleware(getUserRequestSchema),
	catchAsync(userController.getUserById),
);

// ========== Update ==========

router.put(
	"/:id",
	jwtAuthMiddleware,
	validatorMiddleware(updateUserRequestSchema),
	catchAsync(userController.updateUserById),
);

// Admin — update user role
router.patch(
	"/:id/role",
	jwtAuthMiddleware,
	requireRole([Roles.ADMIN]),
	catchAsync(userController.updateUserRole),
);

// Admin — block/unblock user
router.patch(
	"/:id/block",
	jwtAuthMiddleware,
	requireRole([Roles.STAFF, Roles.ADMIN]),
	catchAsync(userController.blockUser),
);

// ========== Delete ==========

router.delete(
	"/:id",
	jwtAuthMiddleware,
	requireRole([Roles.ADMIN]),
	validatorMiddleware(deleteUserRequestSchema),
	catchAsync(userController.deleteUserById),
);

// ========== Delete ==========

router.delete(
	"/:id",
	jwtAuthMiddleware,
	requireRole([Roles.ADMIN]),
	validatorMiddleware(deleteUserRequestSchema),
	catchAsync(userController.deleteUserById),
);

export default router;
