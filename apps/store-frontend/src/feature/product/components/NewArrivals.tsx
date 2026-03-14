import { Skeleton } from "@/components/ui/skeleton";
import { useGetNewArrivals } from "@/feature/product/hooks/useProductQuery";

export function NewArrivals() {
	const { data: products, isLoading } = useGetNewArrivals();

	return (
		<section className="flex flex-col gap-8 py-8">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-4">
					<div className="h-8 w-4 rounded-sm bg-destructive" />
					<span className="font-semibold text-destructive">Featured</span>
				</div>
				<h2 className="text-3xl font-bold tracking-tight">New Arrival</h2>
			</div>

			<div className="relative aspect-[2/1] w-full overflow-hidden rounded-md bg-black">
				{/* Simplified mock UI for New Arrivals layout representing the Bento grid */}
				{isLoading ? (
					<Skeleton className="h-full w-full opacity-50" />
				) : (
					<div className="grid grid-cols-2 h-full w-full p-4 gap-4">
						{products?.slice(0, 4).map((p, index) => (
							<div
								key={p.id}
								className={`bg-muted/10 relative rounded-sm ${index === 0 ? "row-span-2 col-span-1" : ""}`}
							>
								<img
									src={p.images[0]}
									alt={p.name}
									className="h-full w-full object-cover mix-blend-overlay hover:scale-105 transition-transform"
								/>
								<div className="absolute bottom-4 left-4">
									<h3 className="text-lg font-bold text-white mb-2">
										{p.name}
									</h3>
									<p className="text-sm text-white/80 max-w-[200px] line-clamp-2">
										{p.description}
									</p>
									<a
										href={`/product/${p.id}`}
										className="text-white underline mt-2 inline-block"
									>
										Shop Now
									</a>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
