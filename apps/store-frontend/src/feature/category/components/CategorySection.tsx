import { Skeleton } from "@/components/ui/skeleton";
import { CategoryCard } from "@/feature/category/components/CategoryCard";
import { useGetCategories } from "@/feature/category/hooks/useCategoryQuery";

export function CategorySection() {
	const { data: categories, isLoading } = useGetCategories();

	return (
		<section className="flex flex-col gap-8 py-8">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-4">
					<div className="h-8 w-4 rounded-sm bg-destructive" />
					<span className="font-semibold text-destructive">Categories</span>
				</div>
				<h2 className="text-3xl font-bold tracking-tight">
					Browse By Category
				</h2>
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{isLoading
					? Array.from({ length: 6 }).map((_, i) => (
							<Skeleton key={i} className="h-40 w-full" />
						))
					: categories?.map((category) => (
							<CategoryCard key={category.id} {...category} />
						))}
			</div>
			<div className="border-b pt-12" />
		</section>
	);
}
