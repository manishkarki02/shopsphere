import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomQuery } from "@/common/hooks/useCustomQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { METHODS } from "@/enums/request-methods.enum";
import createApi from "@/utils/axios";
import type { ApiResponse } from "@/common/types/api-response.type";

const orderApi = createApi("/orders");

const ORDER_STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as const;
type OrderStatus = typeof ORDER_STATUSES[number];

interface IOrderItem {
	productId: string;
	productName: string;
	price: number;
	quantity: number;
}

interface IOrder {
	_id: string;
	userId: string;
	items: IOrderItem[];
	totalAmount: number;
	status: OrderStatus;
	shippingAddress?: string;
	createdAt: string;
}

const statusColors: Record<OrderStatus, string> = {
	PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
	PROCESSING: "bg-blue-100 text-blue-800 border-blue-200",
	SHIPPED: "bg-purple-100 text-purple-800 border-purple-200",
	DELIVERED: "bg-green-100 text-green-800 border-green-200",
	CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

const ORDER_KEYS = {
	all: ["orders"] as const,
	list: (page: number) => [...ORDER_KEYS.all, page],
};

const getOrders = async (page: number) => {
	const { data }: { data: ApiResponse<{ orders: IOrder[]; total: number }> } =
		await orderApi({ method: METHODS.GET, url: "/", params: { page, limit: 20 } });
	return data.data;
};

const updateOrderStatus = async (id: string, status: OrderStatus) => {
	const { data }: { data: ApiResponse<IOrder> } = await orderApi({
		method: METHODS.PATCH,
		url: `/${id}/status`,
		data: { status },
	});
	return data.data;
};

export function AdminOrderList() {
	const [page] = useState(1);
	const queryClient = useQueryClient();

	const { data, isLoading } = useCustomQuery({
		queryKey: ORDER_KEYS.list(page),
		queryFn: () => getOrders(page),
	});

	const { mutate: patchStatus, isPending } = useMutation({
		mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
			updateOrderStatus(id, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ORDER_KEYS.all });
			toast.success("Order status updated");
		},
		onError: () => toast.error("Failed to update status"),
	});

	const orders: IOrder[] = data?.orders || [];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Orders</h1>
					<p className="text-muted-foreground">
						Manage and track all customer orders
					</p>
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<ShoppingBag className="h-4 w-4" />
					{isLoading ? "..." : `${data?.total ?? 0} total orders`}
				</div>
			</div>

			<div className="rounded-lg border bg-white shadow-sm overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-muted/50 text-left">
						<tr>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Order ID</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Items</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Total</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Date</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Status</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Update Status</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{isLoading
							? Array.from({ length: 8 }).map((_, i) => (
									<tr key={i}>
										{[...Array(6)].map((__, j) => (
											<td key={j} className="px-4 py-3">
												<Skeleton className="h-4 w-full" />
											</td>
										))}
									</tr>
								))
							: orders.length === 0
								? (
										<tr>
											<td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
												No orders found.
											</td>
										</tr>
									)
								: orders.map((order) => (
										<tr key={order._id} className="hover:bg-muted/50 transition-colors">
											<td className="px-4 py-3 font-mono text-xs">
												#{order._id.slice(-8).toUpperCase()}
											</td>
											<td className="px-4 py-3">
												{order.items.length} item{order.items.length !== 1 && "s"}
											</td>
											<td className="px-4 py-3 font-semibold">
												${order.totalAmount.toFixed(2)}
											</td>
											<td className="px-4 py-3 text-muted-foreground text-xs">
												{new Date(order.createdAt).toLocaleDateString()}
											</td>
											<td className="px-4 py-3">
												<Badge
													variant="outline"
													className={statusColors[order.status]}
												>
													{order.status}
												</Badge>
											</td>
											<td className="px-4 py-3">
												<Select
													defaultValue={order.status}
													onValueChange={(val) =>
														patchStatus({ id: order._id, status: val as OrderStatus })
													}
													disabled={isPending}
												>
													<SelectTrigger className="w-36 h-8 text-xs">
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														{ORDER_STATUSES.map((s) => (
															<SelectItem key={s} value={s} className="text-xs">
																{s}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</td>
										</tr>
									))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
