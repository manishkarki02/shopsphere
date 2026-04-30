import { createFileRoute } from "@tanstack/react-router";
import { AdminProductList } from "@/feature/product/components/admin/AdminProductList";

export const Route = createFileRoute("/admin/products/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AdminProductList />;
}
