import express, { type Router } from "express";
import * as categoryController from "./category.controller";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { adminValidator } from "@/common/middlewares/token.middleware";
import { iconUpload } from "@/common/middlewares/fileUpload.middleware";
import { catchAsync } from "@/common/utils/error.util";
import {
    addCategorySchema,
    updateCategorySchema,
    deleteCategorySchema
} from "./validation/category.validation";

const router: Router = express.Router();

router.post(
    "/",
    jwtAuthMiddleware,
    adminValidator,
    iconUpload.single("icon"),
    validatorMiddleware(addCategorySchema),
    catchAsync(categoryController.addCategory)
);

router.patch(
    "/:id",
    jwtAuthMiddleware,
    adminValidator,
    iconUpload.single("icon"),
    validatorMiddleware(updateCategorySchema),
    catchAsync(categoryController.updateCategory)
);

router.get(
    "/",
    jwtAuthMiddleware,
    catchAsync(categoryController.getCategories)
);

router.delete(
    "/:id",
    jwtAuthMiddleware,
    adminValidator,
    validatorMiddleware(deleteCategorySchema),
    catchAsync(categoryController.deleteCategory)
);

export default router;
