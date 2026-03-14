import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import ProductsListPage from "@/feature/product/list-page";

const productSearchSchema = z.object({
	category: z.string().optional(),
	page: z.number().catch(1),
	limit: z.number().catch(12),
});

export const Route = createFileRoute("/products")({
	validateSearch: productSearchSchema,
	component: ProductsListPage,
});
