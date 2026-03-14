import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IProduct } from "@/feature/product/product.service";

export interface CartItem extends IProduct {
	quantity: number;
}

interface CartState {
	items: CartItem[];
	addToCart: (product: IProduct, quantity?: number) => void;
	removeFromCart: (productId: string) => void;
	increaseQuantity: (productId: string) => void;
	decreaseQuantity: (productId: string) => void;
	clearCart: () => void;
	getCartTotal: () => number;
	getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			addToCart: (product, quantity = 1) => {
				set((state) => {
					const existingItem = state.items.find(
						(item) => item.id === product.id,
					);
					if (existingItem) {
						return {
							items: state.items.map((item) =>
								item.id === product.id
									? { ...item, quantity: item.quantity + quantity }
									: item,
							),
						};
					}
					return { items: [...state.items, { ...product, quantity }] };
				});
			},
			removeFromCart: (productId) => {
				set((state) => ({
					items: state.items.filter((item) => item.id !== productId),
				}));
			},
			increaseQuantity: (productId) => {
				set((state) => ({
					items: state.items.map((item) =>
						item.id === productId
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				}));
			},
			decreaseQuantity: (productId) => {
				set((state) => ({
					items: state.items.map((item) =>
						item.id === productId && item.quantity > 1
							? { ...item, quantity: item.quantity - 1 }
							: item,
					),
				}));
			},
			clearCart: () => set({ items: [] }),
			getCartTotal: () => {
				return get().items.reduce(
					(total, item) =>
						total +
						(item.discountPrice && item.discountPrice < item.price
							? item.discountPrice
							: item.price) *
							item.quantity,
					0,
				);
			},
			getCartCount: () => {
				return get().items.reduce((count, item) => count + item.quantity, 0);
			},
		}),
		{
			name: "shop-sphere-cart", // Key used in localStorage
		},
	),
);
