import mongoose, { type Document } from "mongoose";

export interface ICategory extends Document {
	name: string;
	icon: string;
}

const categorySchema = new mongoose.Schema<ICategory>(
	{
		name: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export const Category = mongoose.model<ICategory>("Categories", categorySchema);
