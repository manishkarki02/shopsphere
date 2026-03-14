import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { ApiError } from "@/common/utils/response.util";
import Environment from "@/configs/env";

export interface JwtPayload {
	user: string;
	iat: number;
	exp: number;
}

export const jwtAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies?.jwt;

	if (!token) {
		throw new ApiError(httpStatus.UNAUTHORIZED, { message: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(
			token,
			Environment.get("JWT_SECRET"),
		) as JwtPayload;
		res.locals.user = decoded.user;
		next();
	} catch {
		throw new ApiError(httpStatus.UNAUTHORIZED, { message: "Unauthorized" });
	}
};
