import type { ICategoryResponse } from "@shop-sphere/shared";
import mongoose from "mongoose";

interface ICategoryDocument extends Omit<ICategoryResponse, "_id"> {}

const categorySchema = new mongoose.Schema<ICategoryDocument>(
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

export const Category = mongoose.model<ICategoryDocument>(
	"Categories",
	categorySchema,
);
