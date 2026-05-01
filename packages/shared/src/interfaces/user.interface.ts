export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	otp?: string;
	role: "CUSTOMER" | "STAFF" | "ADMIN";
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
