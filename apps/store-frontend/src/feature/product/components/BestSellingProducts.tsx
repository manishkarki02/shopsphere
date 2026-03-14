import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/feature/product/components/ProductCard";
import { useGetBestSelling } from "@/feature/product/hooks/useProductQuery";

export function BestSellingProducts() {
	const { data: products, isLoading } = useGetBestSelling();

	return (
		<section className="flex flex-col gap-8 py-8">
			<div className="flex items-end justify-between">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4">
						<div className="h-8 w-4 rounded-sm bg-destructive" />
						<span className="font-semibold text-destructive">This Month</span>
					</div>
					<h2 className="text-3xl font-bold tracking-tight">
						Best Selling Products
					</h2>
				</div>

				{!isLoading && (
					<Button
						asChild
						className="bg-destructive hover:bg-destructive/90 text-white"
					>
						<Link to="/products">View All</Link>
					</Button>
				)}
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-b pb-12">
				{isLoading
					? Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} className="h-[350px] w-full" />
						))
					: products
							?.slice(0, 4)
							.map((product) => (
								<ProductCard
									key={product.id}
									{...product}
									showDiscount={false}
								/>
							))}
			</div>
		</section>
	);
}
