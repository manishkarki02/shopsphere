import express, { type Router } from "express";
import { jwtAuthMiddleware } from "@/common/middlewares/auth.middleware";
import { refreshTokenValidator } from "@/common/middlewares/token.middleware";
import validatorMiddleware from "@/common/middlewares/validator.middleware";
import { catchAsync } from "@/common/utils/error.util";
import * as authController from "./auth.controller";
import {
	resendOtpSchema,
	signInSchema,
	signUpSchema,
	verifyEmailSchema,
} from "./validation/auth.validation";

const router: Router = express.Router();

router.post(
	"/signup",
	validatorMiddleware(signUpSchema),
	catchAsync(authController.signUpUser),
);

router.post(
	"/verify",
	validatorMiddleware(verifyEmailSchema),
	catchAsync(authController.verifyEmail),
);

router.post(
	"/resendOtp",
	validatorMiddleware(resendOtpSchema),
	catchAsync(authController.resendOtpCode),
);

router.post(
	"/signin",
	validatorMiddleware(signInSchema),
	catchAsync(authController.signIn),
);

router.get(
	"/generateToken",
	refreshTokenValidator,
	catchAsync(authController.accessTokenGenerator),
);

router.delete(
	"/logout",
	jwtAuthMiddleware,
	catchAsync(authController.logoutHandler),
);

export default router;
