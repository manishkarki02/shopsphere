import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	useDeleteCart,
	useUpdateCart,
} from "@/feature/cart/hooks/useCartMutation";
import { useCartStore } from "@/feature/cart/store/cart.store";
import { useAuth } from "@/store/auth.store";

export const Route = createFileRoute("/cart")({
	component: CartPage,
});

function CartPage() {
	const { isAuthenticated } = useAuth();
	const {
		items,
		removeFromCartLocal,
		increaseQuantityLocal,
		decreaseQuantityLocal,
		clearCart,
		getCartTotal,
	} = useCartStore((state) => ({
		items: state.items,
		removeFromCartLocal: state.removeFromCart,
		increaseQuantityLocal: state.increaseQuantity,
		decreaseQuantityLocal: state.decreaseQuantity,
		clearCart: state.clearCart,
		getCartTotal: state.getCartTotal,
	}));

	const { mutate: updateCartApi } = useUpdateCart();
	const { mutate: deleteCartApi } = useDeleteCart();

	const handleRemoveItem = (id: string, name: string) => {
		removeFromCartLocal(id);
		if (isAuthenticated) {
			deleteCartApi(id);
		} else {
			toast.info(`${name} removed from local cart`);
		}
	};

	const handleQuantityChange = (
		id: string,
		action: "increase" | "decrease",
		currentQty: number,
	) => {
		if (action === "increase") {
			increaseQuantityLocal(id);
			if (isAuthenticated) {
				updateCartApi({ id, body: { quantity: currentQty + 1 } });
			}
		} else {
			if (currentQty > 1) {
				decreaseQuantityLocal(id);
				if (isAuthenticated) {
					updateCartApi({ id, body: { quantity: currentQty - 1 } });
				}
			}
		}
	};

	if (items.length === 0) {
		return (
			<div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh]">
				<div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
					<Heart className="w-12 h-12 text-muted-foreground" />
				</div>
				<h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
				<p className="text-muted-foreground mb-8">
					Looks like you haven't added anything to your cart yet.
				</p>
				<Button
					asChild
					size="lg"
					className="bg-destructive hover:bg-destructive/90 text-white"
				>
					<Link to="/products">Start Shopping</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
				<Link to="/" className="hover:text-foreground">
					Home
				</Link>
				<span>/</span>
				<span className="text-foreground">Cart</span>
			</div>

			<div className="grid lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<div className="rounded-md border bg-card">
						{/* Header */}
						<div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground hidden md:grid">
							<div className="col-span-6">Product</div>
							<div className="col-span-2 text-center">Price</div>
							<div className="col-span-2 text-center">Quantity</div>
							<div className="col-span-2 text-right">Subtotal</div>
						</div>

						{/* Items */}
						<div className="divide-y">
							{items.map((item) => (
								<div
									key={item.id}
									className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center"
								>
									<div className="col-span-1 md:col-span-6 flex items-center gap-4 relative">
										<button
											onClick={() => handleRemoveItem(item.id, item.name)}
											className="absolute -top-2 -left-2 md:static text-destructive hover:bg-destructive/10 p-1 rounded-full transition-colors"
										>
											<Trash2 className="w-4 h-4" />
										</button>
										<img
											src={item.images[0]}
											alt={item.name}
											className="w-16 h-16 object-cover rounded-md bg-muted"
										/>
										<Link
											to="/product/$productId"
											params={{ productId: item.id }}
											className="hover:underline font-medium line-clamp-2"
										>
											{item.name}
										</Link>
									</div>
									<div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
										<span className="md:hidden text-muted-foreground text-sm">
											Price:
										</span>
										<span>
											$
											{item.discountPrice && item.discountPrice < item.price
												? item.discountPrice
												: item.price}
										</span>
									</div>
									<div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
										<span className="md:hidden text-muted-foreground text-sm">
											Qty:
										</span>
										<div className="flex items-center border rounded-md">
											<button
												onClick={() =>
													handleQuantityChange(
														item.id,
														"decrease",
														item.quantity,
													)
												}
												className="px-3 py-1 hover:bg-muted font-bold border-r"
											>
												-
											</button>
											<span className="px-4 text-sm font-medium">
												{item.quantity}
											</span>
											<button
												onClick={() =>
													handleQuantityChange(
														item.id,
														"increase",
														item.quantity,
													)
												}
												className="px-3 py-1 hover:bg-muted font-bold border-l"
											>
												+
											</button>
										</div>
									</div>
									<div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center font-medium">
										<span className="md:hidden text-muted-foreground text-sm">
											Subtotal:
										</span>
										<span>
											$
											{(
												(item.discountPrice && item.discountPrice < item.price
													? item.discountPrice
													: item.price) * item.quantity
											).toFixed(2)}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="flex justify-between items-center mt-6">
						<Button variant="outline" asChild>
							<Link to="/products">Return To Shop</Link>
						</Button>
						<Button
							variant="outline"
							onClick={clearCart}
							className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive"
						>
							Clear Cart
						</Button>
					</div>
				</div>

				<div className="lg:col-span-1">
					<div className="rounded-md border bg-card p-6">
						<h2 className="text-xl font-bold mb-6">Cart Total</h2>
						<div className="flex flex-col gap-4 divide-y">
							<div className="flex justify-between items-center pb-4">
								<span className="text-muted-foreground">Subtotal:</span>
								<span className="font-medium">
									${getCartTotal().toFixed(2)}
								</span>
							</div>
							<div className="flex justify-between items-center py-4">
								<span className="text-muted-foreground">Shipping:</span>
								<span className="text-green-500 font-medium">Free</span>
							</div>
							<div className="flex justify-between items-center py-4 text-lg">
								<span className="font-bold">Total:</span>
								<span className="font-bold">${getCartTotal().toFixed(2)}</span>
							</div>
							<div className="pt-6">
								<Button
									size="lg"
									className="w-full bg-destructive hover:bg-destructive/90 text-white"
								>
									Proceed to checkout
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
