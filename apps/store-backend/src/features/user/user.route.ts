import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { requireRole } from "@/common/middlewares/token.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import * as userController from "./user.controller";
import {
	createUserSchema,
	deleteUserSchema,
	getAllUsersSchema,
	getUserSchema,
	updateUserSchema,
} from "./validation/user.validation";

const router: Router = express.Router();

router.post(
	"/",
	jwtAuthMiddleware,
	requireRole(["ADMIN"]),
	validatorMiddleware(createUserSchema),
	catchAsync(userController.createUser),
);

router.get(
	"/",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	validatorMiddleware(getAllUsersSchema),
	catchAsync(userController.getAllUsers),
);

router.get(
	"/:id",
	jwtAuthMiddleware,
	validatorMiddleware(getUserSchema),
	catchAsync(userController.getUserById),
);

router.put(
	"/:id",
	jwtAuthMiddleware,
	validatorMiddleware(updateUserSchema),
	catchAsync(userController.updateUserById),
);

router.delete(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["ADMIN"]),
	validatorMiddleware(deleteUserSchema),
	catchAsync(userController.deleteUserById),
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

export default router;
