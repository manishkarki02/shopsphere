import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/feature/product/components/ProductCard";
import { useGetTodaySales } from "@/feature/product/hooks/useProductQuery";

export function TodaySales() {
	const { data: sales, isLoading } = useGetTodaySales();

	return (
		<section className="flex flex-col gap-8 py-8">
			<div className="flex items-end justify-between">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4">
						<div className="h-8 w-4 rounded-sm bg-destructive" />
						<span className="font-semibold text-destructive">Today's</span>
					</div>
					<h2 className="text-3xl font-bold tracking-tight">Flash Sales</h2>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{isLoading
					? Array.from({ length: 4 }).map((_, i) => (
							<Skeleton key={i} className="h-[350px] w-full" />
						))
					: sales?.map((product) => (
							<ProductCard key={product.id} {...product} showDiscount={true} />
						))}
			</div>

			{!isLoading && (
				<div className="flex justify-center pt-4 border-b pb-12">
					<Button
						asChild
						className="bg-destructive hover:bg-destructive/90 text-white px-8"
					>
						<Link to="/products">View All Products</Link>
					</Button>
				</div>
			)}
		</section>
	);
}
