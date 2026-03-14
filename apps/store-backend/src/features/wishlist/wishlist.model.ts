import mongoose, { type Document } from "mongoose";

export interface IWishlistItem {
	productId: mongoose.Types.ObjectId;
}

export interface IWishlist extends Document {
	userId: mongoose.Types.ObjectId;
	items: IWishlistItem[];
}

const wishlistItemSchema = new mongoose.Schema<IWishlistItem>({
	productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
});

const wishlistSchema = new mongoose.Schema<IWishlist>(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Adjust ref based on your actual user model
		items: [wishlistItemSchema],
	},
	{
		timestamps: true,
	},
);

export const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
