import mongoose, { type Document } from "mongoose";

export interface ICartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: ICartItem[];
}

const cartItemSchema = new mongoose.Schema<ICartItem>({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema<ICart>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Adjust ref based on your actual user model name
        items: [cartItemSchema],
    },
    {
        timestamps: true,
    }
);

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
