import { CategorySection } from "@/feature/category/components/CategorySection";
import { BestSellingProducts } from "./components/BestSellingProducts";
import { NewArrivals } from "./components/NewArrivals";
import { OurProducts } from "./components/OurProducts";
import { TodaySales } from "./components/TodaySales";

export default function HomePage() {
	return (
		<div className="container mx-auto px-4 max-w-7xl">
			<TodaySales />
			<CategorySection />
			<BestSellingProducts />
			<OurProducts />
			<NewArrivals />
		</div>
	);
}
