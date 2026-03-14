import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Environment from "@/configs/env";
import logger from "@/configs/logger";
import { ApiError } from "./response.util";

// Wrap async route handlers — forwards errors to Express error handler
export const catchAsync =
	(fn: (...args: any[]) => any) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};

// Convert non-ApiError errors into ApiError instances
export const errorConverter = (
	err: any,
	_req: Request,
	_res: Response,
	next: NextFunction,
) => {
	if (!(err instanceof ApiError)) {
		const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
		const message = err.message || "Internal Server Error";
		err = new ApiError(statusCode, { message });
	}
	next(err);
};

// Final error handler — sends error response
export const errorHandler = (
	err: ApiError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const { statusCode, message } = err;

	if (Environment.get("NODE_ENV") === "development") {
		logger.error(err);
	}

	res.status(statusCode).json({
		code: statusCode,
		message,
		...(err.error && { error: err.error }),
		...(Environment.get("NODE_ENV") === "development" && { stack: err.stack }),
	});
};
