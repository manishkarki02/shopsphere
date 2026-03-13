import { z } from "zod";
import { objectIdSchema, paginationSchema } from "@/common/validations/common.validation";
import { createUserBodySchema, updateUserBodySchema } from "@shop-sphere/shared";

export const createUserSchema = z.object({
    body: createUserBodySchema,
});
export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
    params: z.object({ id: objectIdSchema }),
    body: updateUserBodySchema,
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const getUserSchema = z.object({
    params: z.object({ id: objectIdSchema }),
});
export type GetUserSchema = z.infer<typeof getUserSchema>;

export const getAllUsersSchema = z.object({
    query: paginationSchema,
});
export type GetAllUsersSchema = z.infer<typeof getAllUsersSchema>;

export const deleteUserSchema = z.object({
    params: z.object({ id: objectIdSchema }),
});
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
