import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAdminProducts } from "@/feature/product/hooks/useProductQuery";
import type { IProduct } from "@/feature/product/product.service";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminProductList() {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useAdminProducts({ page, limit: 12, sortOrder: "desc" });

	const products = data?.products || [];
	const total = data?.total || 0;
	const totalPages = Math.ceil(total / 12);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold tracking-tight">Products</h1>
				<Link to="/admin/products/new">
					<Button>Add Product</Button>
				</Link>
			</div>

			<div className="border rounded-md">
				<table className="w-full text-sm text-left">
					<thead className="bg-muted">
						<tr>
							<th className="px-4 py-3 font-medium">Name</th>
							<th className="px-4 py-3 font-medium">Price</th>
							<th className="px-4 py-3 font-medium">Stock</th>
							<th className="px-4 py-3 font-medium">Status</th>
							<th className="px-4 py-3 font-medium text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y relative">
						{isLoading ? (
							Array.from({ length: 5 }).map((_, i) => (
								<tr key={i}>
									<td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
									<td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
									<td className="px-4 py-3"><Skeleton className="h-4 w-12" /></td>
									<td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
									<td className="px-4 py-3"><Skeleton className="h-4 w-20 ml-auto" /></td>
								</tr>
							))
						) : products.length === 0 ? (
							<tr>
								<td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
									No products found
								</td>
							</tr>
						) : (
							products.map((product: IProduct) => (
								<tr key={product._id} className="hover:bg-muted/50 transition-colors">
									<td className="px-4 py-3 font-medium">{product.productName}</td>
									<td className="px-4 py-3 font-medium text-muted-foreground">
										${product.price ? product.price.toFixed(2) : "0.00"}
									</td>
									<td className="px-4 py-3">{product.stockQuantity}</td>
									<td className="px-4 py-3">
										<span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${product.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
											{product.isActive ? "Active" : "Disabled"}
										</span>
									</td>
									<td className="px-4 py-3 text-right">
										<Link
											to={`/admin/products/${product._id}/edit` as any}
											className="text-primary hover:underline"
										>
											Edit
										</Link>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{!isLoading && totalPages > 1 && (
				<div className="flex items-center justify-end space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage(page - 1)}
						disabled={page === 1}
					>
						Previous
					</Button>
					<span className="text-sm">
						Page {page} of {totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage(page + 1)}
						disabled={page === totalPages}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
}
