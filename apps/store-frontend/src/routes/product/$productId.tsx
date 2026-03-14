import { createFileRoute } from "@tanstack/react-router";
import ProductDetailsPage from "@/feature/product/details-page";
import { getProductById } from "@/feature/product/product.service";

export const Route = createFileRoute("/product/$productId")({
	loader: async ({ params: { productId } }) => {
		try {
			return await getProductById(productId);
		} catch (err) {
			console.error("Failed to fetch product:", err);
			return null;
		}
	},
	component: ProductDetailsPage,
});
