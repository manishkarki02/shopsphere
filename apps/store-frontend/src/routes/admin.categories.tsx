import { createFileRoute } from "@tanstack/react-router";
import { AdminCategoryList } from "@/feature/category/components/admin/AdminCategoryList";

export const Route = createFileRoute("/admin/categories")({
	component: AdminCategoryList,
});
