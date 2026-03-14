import { z } from "zod";

export const createUserBodySchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	role: z.enum(["CUSTOMER", "STAFF", "ADMIN"]).default("CUSTOMER"),
});

export const updateUserBodySchema = z.object({
	name: z.string().min(2).optional(),
	email: z.string().email().optional(),
	role: z.enum(["CUSTOMER", "STAFF", "ADMIN"]).optional(),
});

export const updateUserRoleBodySchema = z.object({
	role: z.enum(["CUSTOMER", "STAFF", "ADMIN"]),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>;
export type UpdateUserRoleBody = z.infer<typeof updateUserRoleBodySchema>;
