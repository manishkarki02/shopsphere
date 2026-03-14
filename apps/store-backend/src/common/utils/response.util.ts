import type { Response } from "express";

export class ApiError extends Error {
	statusCode: number;
	error?: any;

	constructor(statusCode: number, options: { message: string; error?: any }) {
		super(options.message);
		this.statusCode = statusCode;
		this.error = options.error;
		Object.setPrototypeOf(this, ApiError.prototype);
	}
}

export class ApiResponse {
	static success(
		res: Response,
		statusCode: number,
		options: { message: string; data?: any },
	) {
		return res.status(statusCode).json({
			code: statusCode,
			message: options.message,
			data: options.data || null,
		});
	}
}
