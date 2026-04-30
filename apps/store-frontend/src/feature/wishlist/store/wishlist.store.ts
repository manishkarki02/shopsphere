import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IProduct } from "@/feature/product/product.service";

interface WishlistState {
	items: IProduct[];
	addToWishlist: (product: IProduct) => void;
	removeFromWishlist: (productId: string) => void;
	isInWishlist: (productId: string) => boolean;
	clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
	persist(
		(set, get) => ({
			items: [],
			addToWishlist: (product) => {
				set((state) => {
					if (!state.items.find((item) => item._id === product._id)) {
						return { items: [...state.items, product] };
					}
					return state;
				});
			},
			removeFromWishlist: (productId) => {
				set((state) => ({
					items: state.items.filter((item) => item._id !== productId),
				}));
			},
			isInWishlist: (productId) => {
				return get().items.some((item) => item._id === productId);
			},
			clearWishlist: () => set({ items: [] }),
		}),
		{
			name: "shop-sphere-wishlist",
		},
	),
);
