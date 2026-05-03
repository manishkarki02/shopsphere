import type { IOrderItem, IOrderResponse } from "@shop-sphere/shared";
import mongoose from "mongoose";

export interface IOrderItemDocument extends Omit<IOrderItem, "productId"> {
	productId: mongoose.Types.ObjectId;
}
export interface IOrderDocument
	extends Omit<IOrderResponse, "_id" | "userId" | "createdAt" | "updatedAt"> {
	userId: mongoose.Types.ObjectId;
}

const orderItemSchema = new mongoose.Schema<IOrderItemDocument>(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		productName: { type: String, required: true },
		price: { type: Number, required: true, min: 0 },
		quantity: { type: Number, required: true, default: 1, min: 1 },
		image: { type: String },
	},
	{ _id: false },
);

const orderSchema = new mongoose.Schema<IOrderDocument>(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: { type: [orderItemSchema], required: true },
		totalAmount: { type: Number, required: true },
		status: {
			type: String,
			enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
			default: "PENDING",
		},
		shippingAddress: { type: String },
	},
	{ timestamps: true },
);

export const Order = mongoose.model<IOrderDocument>("Order", orderSchema);
