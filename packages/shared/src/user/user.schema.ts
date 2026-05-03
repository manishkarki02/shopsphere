import z from "zod/v4";
import { Roles } from "./user.constant";

export const createUserBodySchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.email("Invalid email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	role: z.enum(Object.values(Roles)).default(Roles.CUSTOMER),
});

export const updateUserBodySchema = z.object({
	name: z.string().min(2).optional(),
	email: z.email().optional(),
	role: z.enum(Object.values(Roles)).optional(),
});

export const updateUserRoleBodySchema = z.object({
	role: z.enum(Object.values(Roles)),
});
