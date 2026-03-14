import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/feature/cart/hooks/useCartMutation";

import { useCartStore } from "@/feature/cart/store/cart.store";
import {
	useAddToWishlist,
	useDeleteWishlist,
} from "@/feature/wishlist/hooks/useWishlistMutation";
import { useWishlistStore } from "@/feature/wishlist/store/wishlist.store";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/auth.store";
import type { IProduct } from "../product.service";

interface ProductCardProps extends IProduct {
	showDiscount?: boolean;
}

export function ProductCard({
	_id,
	productName,
	images,
	description,
	price,
	discountPercentage,
	category,
	stockQuantity,
	rating,
	reviews,
	isActive,
	isNewArrival,
	showDiscount = false,
}: ProductCardProps) {
	const { isAuthenticated } = useAuth();
	const addToCartLocal = useCartStore((state) => state.addToCart);
	const { isInWishlist, addToWishlistLocal, removeFromWishlistLocal } =
		useWishlistStore((state) => ({
			isInWishlist: state.isInWishlist,
			addToWishlistLocal: state.addToWishlist,
			removeFromWishlistLocal: state.removeFromWishlist,
		}));

	const { mutate: addToCartApi } = useAddToCart();
	const { mutate: addToWishlistApi } = useAddToWishlist();
	const { mutate: deleteWishlistApi } = useDeleteWishlist();

	const handleAddToCart = () => {
		const productData = {
			_id,
			productName,
			images,
			description,
			price,
			discountPercentage,
			category,
			stockQuantity,
			rating,
			reviews,
			isActive,
			isNewArrival,
		};

		// Always update local for immediate feedback
		addToCartLocal(productData);

		if (isAuthenticated) {
			addToCartApi({ id: _id, quantity: 1 });
		} else {
			toast.success(`${productName} added to cart locally`);
		}
	};

	const handleWishlistToggle = () => {
		const productData = {
			_id,
			productName,
			images,
			description,
			price,
			discountPercentage,
			category,
			stockQuantity,
			rating,
			reviews,
			isActive,
			isNewArrival,
		};

		if (isInWishlist(_id)) {
			removeFromWishlistLocal(_id);
			if (isAuthenticated) {
				deleteWishlistApi(_id);
			} else {
				toast.info("Removed from wishlist locally");
			}
		} else {
			addToWishlistLocal(productData);
			if (isAuthenticated) {
				addToWishlistApi({ productId: _id });
			} else {
				toast.success("Added to wishlist locally");
			}
		}
	};

	const discountPercent =
		showDiscount && discountPercentage && discountPercentage > 0
			? discountPercentage
			: 0;
	const currentPrice = discountPercent > 0 ? price - (price * discountPercent) / 100 : price;

	return (
		<div className="group relative flex w-full max-w-[280px] flex-col overflow-hidden rounded-md bg-background transition-all hover:shadow-lg">
			<div className="relative aspect-square w-full overflow-hidden bg-muted/20 p-4">
				{/* Badges */}
				<div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
					{discountPercent > 0 && (
						<Badge
							variant="destructive"
							className="px-2 py-1 text-xs font-semibold"
						>
							-{discountPercent}%
						</Badge>
					)}
					{isNewArrival && (
						<Badge className="bg-green-500 hover:bg-green-600 px-2 py-1 text-xs font-semibold">
							NEW
						</Badge>
					)}
				</div>

				{/* Action Buttons */}
				<div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
					<Button
						size="icon"
						variant="secondary"
						className="h-8 w-8 rounded-full bg-background shadow-sm hover:text-primary"
						onClick={handleWishlistToggle}
					>
						<Heart
							className={cn(
								"h-4 w-4",
								isInWishlist(_id) ? "fill-destructive text-destructive" : "",
							)}
						/>
					</Button>
				</div>

				{/* Product Image Link */}
				<Link
					to="/product/$productId"
					params={{ productId: _id }}
					className="flex h-full w-full items-center justify-center p-4 transition-transform group-hover:scale-105"
				>
					{images && images.length > 0 ? (
						<img
							src={images[0]}
							alt={productName}
							className="h-full w-full object-contain mix-blend-multiply"
							loading="lazy"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
							No Image
						</div>
					)}
				</Link>

				{/* Add to Cart Overlay */}
				<div className="absolute bottom-0 left-0 w-full translate-y-full transition-transform group-hover:translate-y-0 text-center">
					<Button
						className="w-full rounded-none rounded-b-md bg-foreground hover:bg-foreground/90 flex items-center justify-center gap-2"
						onClick={handleAddToCart}
					>
						<ShoppingCart className="h-4 w-4" /> Add To Cart
					</Button>
				</div>
			</div>

			<div className="flex flex-col gap-1 p-4 pb-5">
				<Link
					to="/product/$productId"
					params={{ productId: _id }}
					className="line-clamp-2 text-sm font-semibold hover:underline"
				>
					{productName}
				</Link>

				{/* Pricing */}
				<div className="mt-1 flex items-center gap-2">
					<span className="text-base font-semibold text-destructive">
						${currentPrice.toFixed(2)}
					</span>
					{discountPercent > 0 && (
						<span className="text-sm text-muted-foreground line-through">
							${price}
						</span>
					)}
				</div>

				{/* Ratings */}
				<div className="mt-1 flex items-center gap-2">
					<div className="flex text-amber-400">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={cn(
									"h-3 w-3",
									star <= rating ? "fill-current" : "fill-muted text-muted",
								)}
							/>
						))}
					</div>
					<span className="text-xs text-muted-foreground">({reviews?.length || 0})</span>
				</div>
			</div>
		</div>
	);
}
