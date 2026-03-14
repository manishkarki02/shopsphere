import httpStatus from "http-status";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import { ApiResponse } from "@/common/utils/response.util";
import * as userService from "./user.service";
import type {
	CreateUserSchema,
	DeleteUserSchema,
	GetAllUsersSchema,
	GetUserSchema,
	UpdateUserSchema,
} from "./validation/user.validation";

export const createUser: ValidatedRequestHandler<
	typeof import("./validation/user.validation").createUserSchema
> = async (req, res) => {
	const user = await userService.createUser(req.body);
	return ApiResponse.success(res, httpStatus.CREATED, {
		message: "User created successfully",
		data: user,
	});
};

export const getUserById: ValidatedRequestHandler<
	typeof import("./validation/user.validation").getUserSchema
> = async (req, res) => {
	const user = await userService.getUserById(req.params.id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "User fetched successfully",
		data: user,
	});
};

export const getAllUsers: ValidatedRequestHandler<
	typeof import("./validation/user.validation").getAllUsersSchema
> = async (req, res) => {
	const result = await userService.getAllUsers(req.query);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "Users fetched successfully",
		data: result,
	});
};

export const updateUserById: ValidatedRequestHandler<
	typeof import("./validation/user.validation").updateUserSchema
> = async (req, res) => {
	const user = await userService.updateUserById(req.params.id, req.body);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "User updated successfully",
		data: user,
	});
};

export const deleteUserById: ValidatedRequestHandler<
	typeof import("./validation/user.validation").deleteUserSchema
> = async (req, res) => {
	await userService.deleteUserById(req.params.id);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "User deleted successfully",
	});
};

import type { RequestHandler } from "express";

export const updateUserRole: RequestHandler = async (req, res) => {
	const user = await userService.updateUserRole(
		String(req.params.id),
		req.body.role,
	);
	return ApiResponse.success(res, httpStatus.OK, {
		message: "User role updated",
		data: user,
	});
};

export const blockUser: RequestHandler = async (req, res) => {
	const isBlocked: boolean = req.body.isBlocked;
	const user = await userService.blockUser(String(req.params.id), isBlocked);
	return ApiResponse.success(res, httpStatus.OK, {
		message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
		data: user,
	});
};
