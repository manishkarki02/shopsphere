import httpStatus from "http-status";
import { ApiError } from "@/common/utils/response.util";
import * as jwtHandler from "@/common/services/auth/jwt.service";
import { User } from "@/features/user/user.model";
import type { Request, Response, NextFunction } from "express";

//====>>>> Validates the refresh token and return user email as request body <<<<====//
export const refreshTokenValidator = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            throw new ApiError(httpStatus.UNAUTHORIZED, { message: "No refresh token in cookies." });
        }

        const foundUser = await User.findOne({ refreshToken });

        if (!foundUser) {
            throw new ApiError(httpStatus.UNAUTHORIZED, { message: "User not found with given Refresh Token." });
        }

        const userEmail = jwtHandler.validateRefreshToken(refreshToken);

        if (foundUser.email !== userEmail) {
            throw new ApiError(httpStatus.UNAUTHORIZED, { message: "Refresh token not matched." });
        }
        req.body.email = userEmail;
        next();
    } catch (err) {
        next(err);
    }
};

//====>>>> Validates the If it is admin and return user email as request body <<<<====//
export const adminValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;
        const foundUser = await User.findById(user._id);

        if (foundUser?.roles !== "admin") {
            throw new ApiError(httpStatus.FORBIDDEN, { message: "You are not an admin." });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

export const userValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;
        const foundUser = await User.findById(user._id);

        if (foundUser?.roles !== "user") {
             throw new ApiError(httpStatus.FORBIDDEN, { message: "You are not a user." });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};
