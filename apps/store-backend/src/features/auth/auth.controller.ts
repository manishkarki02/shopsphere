import httpStatus from "http-status";
import { ApiResponse } from "@/common/utils/response.util";
import * as authService from "./auth.service";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import type { RequestHandler } from "express";

export const signUpUser: ValidatedRequestHandler<typeof import("./validation/auth.validation").signUpSchema> = async (req, res) => {
    const result = await authService.signUpUser(req.body);
    return ApiResponse.success(res, httpStatus.CREATED, {
        message: "Registration Complete",
        data: result,
    });
};

export const verifyEmail: ValidatedRequestHandler<typeof import("./validation/auth.validation").verifyEmailSchema> = async (req, res) => {
    await authService.verifyEmail(req.body);
    return ApiResponse.success(res, httpStatus.OK, {
        message: "Verification Complete.",
    });
};

export const signIn: ValidatedRequestHandler<typeof import("./validation/auth.validation").signInSchema> = async (req, res) => {
    const tokens = await authService.signIn(req.body);
    return ApiResponse.success(res, httpStatus.OK, {
        message: "Log in successfull.",
        data: tokens,
    });
};

export const resendOtpCode: ValidatedRequestHandler<typeof import("./validation/auth.validation").resendOtpSchema> = async (req, res) => {
    const user = await authService.resendOtpCode(req.body);
    return ApiResponse.success(res, httpStatus.OK, {
        message: "OTP Resent",
        data: user,
    });
};

export const accessTokenGenerator: RequestHandler = async (req, res) => {
    // Expected to have user email injected by refresh token validator middleware
    const result = await authService.accessTokenGenerator(req.body.email);
    return ApiResponse.success(res, httpStatus.OK, {
        message: "Successfully generated Access token",
        data: result,
    });
};

export const logoutHandler: RequestHandler = async (req, res) => {
    // Expected to have user injected by access token auth middleware
    await authService.logoutHandler(res.locals.user._id);
    return ApiResponse.success(res, httpStatus.OK, {
        message: "Log out successfully",
    });
};
