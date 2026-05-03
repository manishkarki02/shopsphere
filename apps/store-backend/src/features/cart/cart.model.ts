import mongoose from "mongoose";

interface ICartItemDocument {
	productId: mongoose.Types.ObjectId;
	quantity: number;
}

export interface ICartDocument {
	userId: mongoose.Types.ObjectId;
	items: ICartItemDocument[];
}

const cartItemSchema = new mongoose.Schema<ICartItemDocument>({
	productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
	quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema<ICartDocument>(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		items: [cartItemSchema],
	},
	{ timestamps: true },
);

export const Cart = mongoose.model<ICartDocument>("Cart", cartSchema);
