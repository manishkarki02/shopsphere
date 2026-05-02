import httpStatus from "http-status";
import type { ValidatedRequestHandler } from "@/common/types/types/request.type";
import { ApiResponse } from "@/common/utils/response.util";
import * as userService from "./user.service";
import type {
  CreateUserRequestSchema,
  DeleteUserRequestSchema,
  GetAllUsersRequestSchema,
  GetUserRequestSchema,
  UpdateUserRequestSchema,
} from "./validation/user.validation";

// ========== Create ==========

export const createUser: ValidatedRequestHandler<CreateUserRequestSchema> = async (
  req,
  res,
) => {
  const user = await userService.createUser(req.body);
  return ApiResponse.success(res, httpStatus.CREATED, {
    message: "User created successfully",
    data: user,
  });
};

// ========== Read ==========

export const getAllUsers: ValidatedRequestHandler<GetAllUsersRequestSchema> = async (
  req,
  res,
) => {
  const result = await userService.getAllUsers(req.query);
  return ApiResponse.success(res, httpStatus.OK, {
    message: "Users fetched successfully",
    data: result,
  });
};

export const getUserById: ValidatedRequestHandler<GetUserRequestSchema> = async (
  req,
  res,
) => {
  const user = await userService.getUserById(req.params.id);
  return ApiResponse.success(res, httpStatus.OK, {
    message: "User fetched successfully",
    data: user,
  });
};

// ========== Update ==========

export const updateUserById: ValidatedRequestHandler<UpdateUserRequestSchema> = async (
  req,
  res,
) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  return ApiResponse.success(res, httpStatus.OK, {
    message: "User updated successfully",
    data: user,
  });
};

export const updateUserRole: ValidatedRequestHandler = async (req, res) => {
  const user = await userService.updateUserRole(
    String(req.params.id),
    req.body.role,
  );
  return ApiResponse.success(res, httpStatus.OK, {
    message: "User role updated",
    data: user,
  });
};

export const blockUser: ValidatedRequestHandler = async (req, res) => {
  const isBlocked: boolean = req.body.isBlocked;
  const user = await userService.blockUser(String(req.params.id), isBlocked);
  return ApiResponse.success(res, httpStatus.OK, {
    message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
    data: user,
  });
};

// ========== Delete ==========

export const deleteUserById: ValidatedRequestHandler<DeleteUserRequestSchema> = async (
  req,
  res,
) => {
  await userService.deleteUserById(req.params.id);
  return ApiResponse.success(res, httpStatus.OK, {
    message: "User deleted successfully",
  });
};
