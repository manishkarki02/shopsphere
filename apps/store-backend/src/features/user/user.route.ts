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

const router: Router = express.Router();

// ========== Create ==========

router.post(
	"/",
	jwtAuthMiddleware,
	requireRole(["ADMIN"]),
	validatorMiddleware(createUserRequestSchema),
	catchAsync(userController.createUser),
);

// ========== Read ==========

router.get(
	"/",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
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
	requireRole(["ADMIN"]),
	catchAsync(userController.updateUserRole),
);

// Admin — block/unblock user
router.patch(
	"/:id/block",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	catchAsync(userController.blockUser),
);

// ========== Delete ==========

router.delete(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["ADMIN"]),
	validatorMiddleware(deleteUserRequestSchema),
	catchAsync(userController.deleteUserById),
);

// ========== Delete ==========

router.delete(
  "/:id",
  jwtAuthMiddleware,
  requireRole(["ADMIN"]),
  validatorMiddleware(deleteUserSchema),
  catchAsync(userController.deleteUserById),
);

export default router;
