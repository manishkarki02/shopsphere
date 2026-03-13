import httpStatus from "http-status";
import { User, type IUser } from "./user.model";
import { ApiError } from "@/common/utils/response.util";
import { applyQueryFeatures } from "@/common/utils/query.utils";
import type {
    CreateUserSchema,
    UpdateUserSchema,
    GetAllUsersSchema,
} from "./validation/user.validation";
import bcrypt from "bcrypt";

export async function createUser(body: CreateUserSchema["body"]) {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        throw new ApiError(httpStatus.CONFLICT, { message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await User.create({ ...body, password: hashedPassword });
    return user;
}

export async function getUserById(id: string) {
    const user = await User.findById(id);
    if (!user || !user.isVerified) {
        throw new ApiError(httpStatus.NOT_FOUND, { message: "User not found" });
    }
    return user;
}

export async function getAllUsers(query: GetAllUsersSchema["query"]) {
    return await applyQueryFeatures(User, { isVerified: true }, query, {
        fieldsToSearch: ["firstName", "lastName", "email"],
    });
}

export async function updateUserById(id: string, body: UpdateUserSchema["body"]) {
    const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, { message: "User not found" });
    }
    return user;
}

export async function deleteUserById(id: string) {
    // Soft delete
    const user = await User.findByIdAndUpdate(id, { isVerified: false }, { new: true });
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, { message: "User not found" });
    }
    return user;
}
