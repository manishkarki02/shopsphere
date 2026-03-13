import httpStatus from "http-status";
import { Wishlist } from "./wishlist.model";
import { Product } from "@/features/product/product.model";
import { ApiError } from "@/common/utils/response.util";
import mongoose from "mongoose";

export async function addWishlist(userId: string, productId: string) {
    const existingWishlist = await Wishlist.findOne({ userId });
    const wishlistItem = {
        productId: new mongoose.Types.ObjectId(productId),
    };

    if (existingWishlist) {
        const doubleWishlistItem = existingWishlist.items.find(
            (item) => String(item.productId) === String(productId)
        );
        if (!doubleWishlistItem) {
            existingWishlist.items.push(wishlistItem);
            await existingWishlist.save();
        }
        return existingWishlist;
    } else {
        const wishlistProduct = await Wishlist.create({
            userId,
            items: [wishlistItem],
        });

        if (!wishlistProduct) {
             throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, { message: "Failed to add product to wishlist" });
        }
        return wishlistProduct;
    }
}

export async function getWishlists(userId: string) {
    const userWishlist = await Wishlist.findOne({ userId }).populate("items.productId");
    
    if (!userWishlist) {
         throw new ApiError(httpStatus.NOT_FOUND, { message: "Wishlist is empty" });
    }

    const productsInWishlist = userWishlist.items.map((item) => ({
        product: item.productId,
    }));

    return productsInWishlist;
}

export async function deleteWishlist(userId: string, productId: string) {
    const userWishlist = await Wishlist.findOne({ userId });
    
    if (!userWishlist) {
         throw new ApiError(httpStatus.NOT_FOUND, { message: "user wishlist is empty" });
    }

    const productsInWishlist = await Wishlist.findOne({
        userId,
        "items.productId": productId,
    });
    
    if (!productsInWishlist) {
         throw new ApiError(httpStatus.NOT_FOUND, { message: "this product is not in wishlist" });
    }

    const updatedWishlist = await Wishlist.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId: productId } } },
        { new: true }
    );
    
    if (!updatedWishlist) {
         throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, { message: "wishlist not found" });
    }

    return null;
}
