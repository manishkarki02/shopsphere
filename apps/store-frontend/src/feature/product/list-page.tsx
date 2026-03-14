import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/feature/product/components/ProductCard";
import { useGetProducts } from "@/feature/product/hooks/useProductQuery";
import { Route } from "@/routes/products";

export default function ProductsListPage() {
	const { category, page = 1, limit = 12 } = Route.useSearch();
	const navigate = useNavigate();

	const { data, isLoading } = useGetProducts({
		category,
		page: Number(page),
		limit: Number(limit),
	});

	const products = data?.products || [];
	const total = data?.total || 0;
	const totalPages = Math.ceil(total / Number(limit));

	const handlePageChange = (newPage: number) => {
		navigate({
			to: "/products",
			search: (prev) => ({ ...prev, page: newPage }),
		});
	};

	return (
		<div className="container mx-auto max-w-7xl px-4 py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight mb-2">
					{category ? `${category} Products` : "Explore All Products"}
				</h1>
				<p className="text-muted-foreground">
					Browse through our vast collection of items.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{isLoading
					? Array.from({ length: 12 }).map((_, i) => (
							<Skeleton key={i} className="h-[350px] w-full" />
						))
					: products.map((product) => (
							<ProductCard key={product._id} {...product} showDiscount={false} />
						))}
			</div>

			{!isLoading && products.length === 0 && (
				<div className="py-24 text-center">
					<h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
					<p className="text-muted-foreground">
						Adjust your filters or try another category.
					</p>
					<Button
						className="mt-4"
						onClick={() =>
							navigate({ to: "/products", search: { page: 1, limit: 12 } })
						}
					>
						Clear Filters
					</Button>
				</div>
			)}

			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-2 pt-12">
					<Button
						variant="outline"
						disabled={page <= 1}
						onClick={() => handlePageChange(Number(page) - 1)}
					>
						Previous
					</Button>

					<span className="text-sm font-medium mx-4">
						Page {page} of {totalPages}
					</span>

					<Button
						variant="outline"
						disabled={page >= totalPages}
						onClick={() => handlePageChange(Number(page) + 1)}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
}
