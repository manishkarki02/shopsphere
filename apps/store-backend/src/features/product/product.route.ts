import express, { type Router } from "express";
import * as productController from "./product.controller";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { adminValidator } from "@/common/middlewares/token.middleware";
import { imagesUpload } from "@/common/middlewares/fileUpload.middleware";
import { catchAsync } from "@/common/utils/error.util";
import {
    createProductSchema,
    updateProductSchema,
    deleteProductSchema,
    getProductSchema
} from "./validation/product.validation";

const router: Router = express.Router();

router.post(
    "/",
    jwtAuthMiddleware,
    adminValidator,
    imagesUpload.array("images", 5),
    validatorMiddleware(createProductSchema),
    catchAsync(productController.createProduct)
);

router.put(
    "/:id",
    jwtAuthMiddleware,
    adminValidator,
    imagesUpload.array("images", 4),
    validatorMiddleware(updateProductSchema),
    catchAsync(productController.updateProduct)
);

router.delete(
    "/:id",
    jwtAuthMiddleware,
    adminValidator,
    validatorMiddleware(deleteProductSchema),
    catchAsync(productController.deleteProduct)
);

router.get(
    "/:id",
    validatorMiddleware(getProductSchema),
    catchAsync(productController.getProductById)
);

router.get(
    "/",
    catchAsync(productController.getProducts)
);

export default router;
