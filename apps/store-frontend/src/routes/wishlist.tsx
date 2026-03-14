import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAddAllToCart } from "@/feature/cart/hooks/useCartMutation";
import { useCartStore } from "@/feature/cart/store/cart.store";
import { ProductCard } from "@/feature/product/components/ProductCard";
import { useWishlistStore } from "@/feature/wishlist/store/wishlist.store";
import { useAuth } from "@/store/auth.store";

export const Route = createFileRoute("/wishlist")({
	component: WishlistPage,
});

function WishlistPage() {
	const { isAuthenticated } = useAuth();
	const { items } = useWishlistStore();
	const addToCartLocal = useCartStore((state) => state.addToCart);
	const { mutate: addAllToCartApi } = useAddAllToCart();

	const handleMoveAllToCart = () => {
		if (items.length === 0) return;

		// Always update local for immediate feedback
		items.forEach((item) => addToCartLocal(item));

		if (isAuthenticated) {
			const cartItems = items.map((item) => ({
				productId: item.id,
				quantity: 1,
			}));
			addAllToCartApi(cartItems);
		} else {
			toast.success("All items moved to local cart");
		}
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-xl font-medium">Wishlist ({items.length})</h1>
				<Button
					variant="outline"
					onClick={handleMoveAllToCart}
					disabled={items.length === 0}
				>
					Move All To Cart
				</Button>
			</div>

			{items.length === 0 ? (
				<div className="py-24 flex flex-col items-center justify-center border rounded-md bg-card">
					<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
						<Heart className="w-8 h-8 text-muted-foreground" />
					</div>
					<h2 className="text-2xl font-semibold mb-2">
						Your wishlist is empty
					</h2>
					<p className="text-muted-foreground mb-6">
						Explore more and shortlist some items.
					</p>
					<Button asChild>
						<Link to="/products">Return to shop</Link>
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{items.map((item) => (
						<ProductCard key={item.id} {...item} />
					))}
				</div>
			)}
		</div>
	);
}
