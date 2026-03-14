import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Route } from "@/routes/product/$productId";

export default function ProductDetailsPage() {
	const product = Route.useLoaderData();

	if (!product) {
		return (
			<div className="p-8 text-center bg-destructive text-white rounded-md m-4">
				Failed to load product details!
			</div>
		);
	}

	const {
		productName,
		description,
		price,
		discountPercentage,
		stockQuantity,
		images,
		rating,
		reviews,
	} = product;

	return (
		<div className="container mx-auto max-w-7xl px-4 py-8">
			{/* Breadcrumbs can be added here if defined later */}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
				{/* Image Gallery Mockup */}
				<div className="flex gap-4">
					<div className="flex flex-col gap-2 w-24">
						{images?.map((img, i) => (
							<img
								key={i}
								src={img}
								className="w-full aspect-square object-cover rounded-md bg-muted cursor-pointer hover:opacity-80 transition-opacity"
							/>
						))}
					</div>
					<div className="flex-1 bg-muted rounded-md overflow-hidden flex items-center justify-center p-8">
						{images && images.length > 0 ? (
							<img
								src={images[0]}
								className="w-full h-full object-contain mix-blend-multiply"
							/>
						) : (
							<span>No Preview Available</span>
						)}
					</div>
				</div>

				{/* Details Content */}
				<div className="flex flex-col gap-6">
					<h1 className="text-3xl font-bold">{productName}</h1>

					<div className="flex gap-4 items-center">
						<div className="flex text-amber-400">
							{[1, 2, 3, 4, 5].map((st) => (
								<Star
									key={st}
									className={`w-4 h-4 ${st <= rating ? "fill-amber-400" : "fill-muted text-muted"}`}
								/>
							))}
						</div>
						<span className="text-muted-foreground text-sm">
							({reviews?.length || 0} Reviews)
						</span>
						<span className="text-green-500 text-sm font-semibold pl-4 border-l">
							In Stock ({stockQuantity})
						</span>
					</div>

					<div className="text-2xl pt-2">
						${
							discountPercentage && discountPercentage > 0
								? price - (price * discountPercentage) / 100
								: price
						}
					</div>

					<p className="text-sm leading-relaxed border-b pb-6">{description}</p>

					<div className="flex items-center gap-4 pt-4">
						{/* Quantity Counter mock */}
						<div className="flex border rounded-md">
							<button className="px-4 py-2 hover:bg-muted font-bold border-r">
								-
							</button>
							<span className="px-6 py-2">1</span>
							<button className="px-4 py-2 hover:bg-destructive hover:text-white font-bold border-l bg-destructive text-white">
								+
							</button>
						</div>
						<Button className="flex-1 bg-destructive hover:bg-destructive/90 text-white rounded-md h-10 gap-2 font-normal text-md">
							<ShoppingCart className="w-5 h-5" /> Buy Now
						</Button>
						<Button variant="outline" size="icon" className="h-10 w-10">
							<Heart className="w-5 h-5" />
						</Button>
					</div>

					{/* Features list mock */}
					<div className="border rounded-md mt-6 flex flex-col">
						<div className="p-4 border-b flex gap-4 items-center">
							<Star className="w-6 h-6" />
							<div>
								<p className="font-semibold text-sm">Free Delivery</p>
								<a href="#" className="underline text-xs text-muted-foreground">
									Enter your postal code for Delivery Availability
								</a>
							</div>
						</div>
						<div className="p-4 flex gap-4 items-center">
							<Star className="w-6 h-6" />
							<div>
								<p className="font-semibold text-sm">Return Delivery</p>
								<p className="text-xs text-muted-foreground">
									Free 30 Days Delivery Returns.{" "}
									<a href="#" className="underline text-foreground">
										Details
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
