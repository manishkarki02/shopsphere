import type { IUser } from "@shop-sphere/shared";
import mongoose, { Schema } from "mongoose";

export interface IUserDocument extends Omit<IUser, "address"> {
	address: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUserDocument>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		otp: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["CUSTOMER", "STAFF", "ADMIN"],
			default: "CUSTOMER",
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(_doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				delete ret.password;
			},
		},
	},
);

export const User = mongoose.model<IUserDocument>("User", userSchema);
