import type { IWishlistResponse } from "@shop-sphere/shared";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { ApiError } from "@/common/utils/response.util";
import { Wishlist } from "./wishlist.model";

// ========== Create ==========

export async function addWishlist(userId: string, productId: string) {
  const existingWishlist = await Wishlist.findOne({ userId });
  const wishlistItem = {
    productId: new mongoose.Types.ObjectId(productId),
  };

  if (existingWishlist) {
    const doubleWishlistItem = existingWishlist.items.find(
      (item) => String(item.productId) === String(productId),
    );
    if (!doubleWishlistItem) {
      existingWishlist.items.push(wishlistItem);
      await existingWishlist.save();
    }
    return existingWishlist.toObject() as IWishlistResponse;
  }

  const wishlistProduct = await Wishlist.create({
    userId,
    items: [wishlistItem],
  });

  if (!wishlistProduct) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, {
      message: "Failed to add product to wishlist",
    });
  }
  return wishlistProduct.toObject() as IWishlistResponse;
}

// ========== Read ==========

export async function getWishlists(userId: string) {
  const userWishlist = await Wishlist.findOne({ userId }).populate(
    "items.productId",
  );

  const productsInWishlist = userWishlist?.items.map((item) => ({
    product: item.productId,
  }));

  return productsInWishlist;
}

// ========== Delete ==========

export async function deleteWishlist(userId: string, productId: string) {
  const userWishlist = await Wishlist.findOne({ userId });

  if (!userWishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, {
      message: "user wishlist is empty",
    });
  }

  const productsInWishlist = await Wishlist.findOne({
    userId,
    "items.productId": productId,
  });

  if (!productsInWishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, {
      message: "this product is not in wishlist",
    });
  }

  const updatedWishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId: productId } } },
    { new: true },
  );

  if (!updatedWishlist) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, {
      message: "wishlist not found",
    });
  }

  return null;
}
