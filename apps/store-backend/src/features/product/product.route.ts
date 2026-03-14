import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { imagesUpload } from "@/common/middlewares/fileUpload.middleware";
import { requireRole } from "@/common/middlewares/token.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import * as productController from "./product.controller";
import {
	createProductSchema,
	deleteProductSchema,
	getProductSchema,
	updateProductSchema,
	updateProductStatusSchema,
} from "./validation/product.validation";

const router: Router = express.Router();

router.post(
	"/",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	imagesUpload.array("images", 5),
	validatorMiddleware(createProductSchema),
	catchAsync(productController.createProduct),
);

router.put(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	imagesUpload.array("images", 4),
	validatorMiddleware(updateProductSchema),
	catchAsync(productController.updateProduct),
);

router.patch(
	"/:id/status",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	validatorMiddleware(updateProductStatusSchema),
	catchAsync(productController.updateProductStatus),
);

router.delete(
	"/:id",
	jwtAuthMiddleware,
	requireRole(["STAFF", "ADMIN"]),
	validatorMiddleware(deleteProductSchema),
	catchAsync(productController.deleteProduct),
);

router.get(
	"/:id",
	validatorMiddleware(getProductSchema),
	catchAsync(productController.getProductById),
);

router.get("/", catchAsync(productController.getProducts));

export default router;
