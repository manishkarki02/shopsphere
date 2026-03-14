import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwtHandler from "@/common/services/auth/jwt.service";
import { ApiError } from "@/common/utils/response.util";
import { User } from "@/features/user/user.model";

//====>>>> Validates the refresh token and return user email as request body <<<<====//
export const refreshTokenValidator = async (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const { refreshToken } = req.cookies;

		if (!refreshToken) {
			throw new ApiError(httpStatus.UNAUTHORIZED, {
				message: "No refresh token in cookies.",
			});
		}

		const foundUser = await User.findOne({ refreshToken });

		if (!foundUser) {
			throw new ApiError(httpStatus.UNAUTHORIZED, {
				message: "User not found with given Refresh Token.",
			});
		}

		const userEmail = jwtHandler.validateRefreshToken(refreshToken);

		if (foundUser.email !== userEmail) {
			throw new ApiError(httpStatus.UNAUTHORIZED, {
				message: "Refresh token not matched.",
			});
		}
		req.body.email = userEmail;
		next();
	} catch (err) {
		next(err);
	}
};

//====>>>> Validates the role <<<<====//
export const requireRole = (allowedRoles: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = res.locals.user;
			const foundUser = await User.findById(user._id);

			if (!foundUser || !allowedRoles.includes(foundUser.role)) {
				throw new ApiError(httpStatus.FORBIDDEN, {
					message: "You do not have permission to perform this action.",
				});
			} else {
				next();
			}
		} catch (err) {
			next(err);
		}
	};
};
