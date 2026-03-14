import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { iconUpload } from "@/common/middlewares/fileUpload.middleware";
import { requireRole } from "@/common/middlewares/token.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import * as categoryController from "./category.controller";
import {
	addCategorySchema,
	deleteCategorySchema,
	updateCategorySchema,
} from "./validation/category.validation";

const router: Router = express.Router();

router.post(
	"/",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	iconUpload.single("icon"),
	validatorMiddleware(addCategorySchema),
	catchAsync(categoryController.addCategory),
);

router.patch(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	iconUpload.single("icon"),
	validatorMiddleware(updateCategorySchema),
	catchAsync(categoryController.updateCategory),
);

router.get(
	"/",
	jwtAuthMiddleware,
	catchAsync(categoryController.getCategories),
);

router.delete(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	validatorMiddleware(deleteCategorySchema),
	catchAsync(categoryController.deleteCategory),
);

export default router;
