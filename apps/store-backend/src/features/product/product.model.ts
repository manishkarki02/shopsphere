import type { IProduct } from "@shop-sphere/shared";
import mongoose from "mongoose";

interface IProductDocument extends Omit<IProduct, "category" | "reviews"> {
	category: mongoose.Types.ObjectId;
	reviews: mongoose.Types.ObjectId[];
}

const productSchema = new mongoose.Schema<IProductDocument>(
	{
		productName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		color: [
			{
				type: String,
				enum: ["red", "green", "blue", "black"],
			},
		],
		discountPercentage: {
			type: Number,
			default: 0,
		},
		rating: {
			type: Number,
			default: 0,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Categories",
			required: true,
		},
		images: [{ type: String, required: true }],
		thumbnail: { type: String, required: true },
		stockQuantity: {
			type: Number,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		reviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Reviews",
				default: [],
			},
		],
	},
	{
		timestamps: true,
	},
);

export const Product = mongoose.model<IProductDocument>(
	"Products",
	productSchema,
);
