import type { Roles } from "./user.constant";

export type Role = (typeof Roles)[keyof typeof Roles];

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	otp?: string;
	role: Role;
	isVerified: boolean;
	address?: string[];
	refreshToken?: string;
}

export interface IUserResponse
	extends Omit<IUser, "password" | "otp" | "refreshToken"> {
	_id: string;
	createdAt: Date;
	updatedAt: Date;
}
