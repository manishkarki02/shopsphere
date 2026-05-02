import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { applyQueryFeatures } from "@/common/utils/query.utils";
import { ApiError } from "@/common/utils/response.util";
import { IUserDocument, User } from "./user.model";
import type {
  CreateUserRequestSchema,
  GetAllUsersRequestSchema,
  UpdateUserRequestSchema,
  DeleteUserRequestSchema,
  GetUserRequestSchema,
} from "./validation/user.validation";
import { IUserResponse } from "@shop-sphere/shared";

// ------------- Create a User --------------
// ========== Create ==========

export async function createUser(body: CreateUserRequestSchema["body"]) {
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, {
      message: "Email already in use",
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = await User.create({ ...body, password: hashedPassword });
  return user.toObject() as IUserResponse;
}

// ========== Read ==========

export async function getAllUsers(query: GetAllUsersRequestSchema["query"]) {
  return await applyQueryFeatures<IUserDocument, IUserResponse>(
    User,
    { isVerified: true },
    query,
    {
      fieldsToSearch: ["firstName", "lastName", "email"],
    },
  );
}

export async function getUserById(id: string) {
  const user = await User.findById(id).lean<IUserResponse>();
  if (!user?.isVerified) {
    throw new ApiError(httpStatus.NOT_FOUND, { message: "User not found" });
  }
  return user;
}

// ========== Update ==========

export async function updateUserById(
  id: string,
  body: UpdateUserRequestSchema["body"],
) {
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, { message: "User not found" });
  }
  return user;
}

export async function updateUserRole(id: string, role: string) {
  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true },
  );
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, { message: "User not found" });
  }
  return user;
}

export async function blockUser(id: string, isBlocked: boolean) {
  // We use isVerified field as block mechanism (false = blocked)
  const user = await User.findByIdAndUpdate(
    id,
    { isVerified: !isBlocked },
    { new: true },
  );
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, { message: "User not found" });
  }
  return user;
}

// ========== Delete ==========

export async function deleteUserById(id: string) {
  // Soft delete
  const user = await User.findByIdAndUpdate(
    id,
    { isVerified: false },
    { new: true },
  );
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, { message: "User not found" });
  }
  return user;
}
