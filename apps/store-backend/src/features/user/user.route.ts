import express, { type Router } from "express";
import * as userController from "./user.controller";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import {
    createUserSchema,
    getUserSchema,
    getAllUsersSchema,
    updateUserSchema,
    deleteUserSchema,
} from "./validation/user.validation";
import { catchAsync } from "@/common/utils/error.util";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";

const router: Router = express.Router();

router.post(
    "/",
    jwtAuthMiddleware,
    validatorMiddleware(createUserSchema),
    catchAsync(userController.createUser),
);

router.get(
    "/",
    jwtAuthMiddleware,
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
    validatorMiddleware(deleteUserSchema),
    catchAsync(userController.deleteUserById),
);

export default router;
