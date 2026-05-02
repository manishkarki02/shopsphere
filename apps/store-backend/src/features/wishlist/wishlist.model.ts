import mongoose from "mongoose";

interface IWishlistItemDocument {
	productId: mongoose.Types.ObjectId;
}

interface IWishlistDocument {
	userId: mongoose.Types.ObjectId;
	items: IWishlistItemDocument[];
}

const wishlistItemSchema = new mongoose.Schema<IWishlistItemDocument>({
	productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
});

const wishlistSchema = new mongoose.Schema<IWishlistDocument>(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		items: [wishlistItemSchema],
	},
	{
		timestamps: true,
	},
);

export const Wishlist = mongoose.model<IWishlistDocument>(
	"Wishlist",
	wishlistSchema,
);
