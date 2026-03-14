import { createFileRoute } from "@tanstack/react-router";
import { AdminOrderList } from "@/feature/order/components/admin/AdminOrderList";

export const Route = createFileRoute("/admin/orders")({
	component: AdminOrderList,
});
