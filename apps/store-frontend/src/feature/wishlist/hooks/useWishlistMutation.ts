import { useCustomMutation } from "@/common/hooks/useCustomMutation";
import { useAuth } from "@/store/auth.store";
import { useWishlistStore } from "../store/wishlist.store";
import { addToWishlistApi, deleteWishlistApi } from "../wishlist.service";

export function useAddToWishlist() {
	return useCustomMutation({
		api: addToWishlistApi,
		success: "Added to wishlist",
	});
}

export function useDeleteWishlist() {
	return useCustomMutation({
		api: deleteWishlistApi,
		success: "Removed from wishlist",
	});
}
