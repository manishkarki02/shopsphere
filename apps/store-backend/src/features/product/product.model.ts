import mongoose, { type Document } from "mongoose";

export interface IProduct extends Document {
	productName: string;
	description: string;
	price: number;
	color: string[];
	discountPercentage: number;
	rating: number;
	category: mongoose.Types.ObjectId;
	images: string[];
	thumbnail: string;
	stockQuantity: number;
	isActive: boolean;
	reviews: any[]; // Or add a separate review schema if needed, kept as any for now per original structure
}

const productSchema = new mongoose.Schema<IProduct>(
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
		reviews: {
			type: [mongoose.Schema.Types.Mixed] as any,
			default: [],
		},
	},
	{
		timestamps: true,
	},
);

export const Product = mongoose.model<IProduct>("Products", productSchema);
