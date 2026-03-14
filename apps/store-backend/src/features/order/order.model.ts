import mongoose, { type Document } from "mongoose";

export type OrderStatus =
	| "PENDING"
	| "PROCESSING"
	| "SHIPPED"
	| "DELIVERED"
	| "CANCELLED";

export interface IOrderItem {
	productId: string;
	productName: string;
	price: number;
	quantity: number;
	image?: string;
}

export interface IOrder extends Document {
	userId: mongoose.Types.ObjectId;
	items: IOrderItem[];
	totalAmount: number;
	status: OrderStatus;
	shippingAddress?: string;
	createdAt: Date;
	updatedAt: Date;
}

const orderItemSchema = new mongoose.Schema<IOrderItem>(
	{
		productId: { type: String, required: true },
		productName: { type: String, required: true },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true, default: 1 },
		image: { type: String },
	},
	{ _id: false },
);

const orderSchema = new mongoose.Schema<IOrder>(
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

export const Order = mongoose.model<IOrder>("Order", orderSchema);
