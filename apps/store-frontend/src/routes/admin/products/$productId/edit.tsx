import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ProductForm, type ProductFormValues } from "@/feature/product/components/admin/ProductForm";
import { useUpdateProduct, useGetProductParams } from "@/feature/product/hooks/useProductQuery";

export const Route = createFileRoute("/admin/products/$productId/edit")({
	component: RouteComponent,
});

function RouteComponent() {
	const { productId } = Route.useParams();
	const navigate = useNavigate();
	const { data: product, isLoading: isFetching } = useGetProductParams(productId);
	const { mutateAsync: updateProduct, isPending } = useUpdateProduct();

	const handleSubmit = async (values: ProductFormValues, files: File[]) => {
		try {
			const formData = new FormData();
			
			// Append all text fields
			Object.entries(values).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					formData.append(key, value.toString());
				}
			});

			// Append files
			files.forEach((file) => {
				formData.append("images", file);
			});

			await updateProduct({ id: productId, formData });
			toast.success("Product updated successfully");
			navigate({ to: "/admin/products" });
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "Failed to update product");
		}
	};

	if (isFetching) {
		return (
			<div className="flex h-[400px] items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
				<p className="text-muted-foreground">Update the details of your product.</p>
			</div>
			<ProductForm initialData={product} onSubmit={handleSubmit} isLoading={isPending} />
		</div>
	);
}
