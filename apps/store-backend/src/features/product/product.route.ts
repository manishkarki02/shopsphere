import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { imagesUpload } from "@/common/middlewares/fileUpload.middleware";
import { requireRole } from "@/common/middlewares/token.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import * as productController from "./product.controller";
import {
  createProductRequestSchema,
  deleteProductRequestSchema,
  getProductRequestSchema,
  updateProductRequestSchema,
  updateProductStatusRequestSchema,
} from "./validation/product.validation";

const router: Router = express.Router();

// ============================================================
// CREATE
// ============================================================

router.post(
  "/",
  jwtAuthMiddleware,
  requireRole(["STAFF", "ADMIN"]),
  imagesUpload.array("images", 5),
  validatorMiddleware(createProductRequestSchema),
  catchAsync(productController.createProduct),
);

// ============================================================
// READ
// ============================================================

router.get("/", catchAsync(productController.getProducts));

router.get(
  "/:id",
  validatorMiddleware(getProductRequestSchema),
  catchAsync(productController.getProductById),
);

// ============================================================
// UPDATE
// ============================================================

router.put(
  "/:id",
  jwtAuthMiddleware,
  requireRole(["STAFF", "ADMIN"]),
  imagesUpload.array("images", 4),
  validatorMiddleware(updateProductRequestSchema),
  catchAsync(productController.updateProduct),
);

router.patch(
  "/:id/status",
  jwtAuthMiddleware,
  requireRole(["STAFF", "ADMIN"]),
  validatorMiddleware(updateProductStatusRequestSchema),
  catchAsync(productController.updateProductStatus),
);

// ============================================================
// DELETE
// ============================================================

router.delete(
  "/:id",
  jwtAuthMiddleware,
  requireRole(["STAFF", "ADMIN"]),
  validatorMiddleware(deleteProductRequestSchema),
  catchAsync(productController.deleteProduct),
);

export default router;
