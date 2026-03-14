import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import httpStatus from "http-status";
import routes from "@/common/routes";
import { errorConverter, errorHandler } from "@/common/utils/error.util";
import { ApiError, ApiResponse } from "@/common/utils/response.util";
import Environment from "@/configs/env";
import * as morgan from "@/configs/morgan";

const app: Express = express();

// HTTP logging
if (Environment.get("NODE_ENV") !== "test") {
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);
}

// CORS
app.use(
	cors({
		origin: Environment.get("CORS_ORIGIN"),
		credentials: true,
	}),
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parsing
app.use(cookieParser());

// API routes
app.use("/api", routes);

// Health check
app.get("/health", (_req, res) => {
	return ApiResponse.success(res, httpStatus.OK, { message: "API is healthy" });
});

// 404 handler
app.use((_req, _res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, { message: "Route not found" }));
});

// Error handling
app.use(errorConverter);
app.use(errorHandler);

export default app;
