import {
	createUserBodySchema,
	queryValidationSchema,
	updateUserBodySchema,
} from "@shop-sphere/shared";
import z from "zod/v4";
import { objectIdSchema } from "@/common/validations/common.validation";

// ========== Create ==========

export const createUserRequestSchema = z.object({
	body: createUserBodySchema,
});
export type CreateUserRequestSchema = z.infer<typeof createUserRequestSchema>;

// ========== Read ==========

export const getAllUsersRequestSchema = z.object({
	query: queryValidationSchema,
});
export type GetAllUsersRequestSchema = z.infer<typeof getAllUsersRequestSchema>;

export const getUserRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});
export type GetUserRequestSchema = z.infer<typeof getUserRequestSchema>;

// ========== Update ==========

export const updateUserRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
	body: updateUserBodySchema,
});
export type UpdateUserRequestSchema = z.infer<typeof updateUserRequestSchema>;

// ========== Delete ==========

export const deleteUserRequestSchema = z.object({
	params: z.object({ id: objectIdSchema }),
});
export type DeleteUserRequestSchema = z.infer<typeof deleteUserRequestSchema>;
