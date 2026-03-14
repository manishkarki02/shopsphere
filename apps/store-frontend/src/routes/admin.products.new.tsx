import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ProductForm, type ProductFormValues } from "@/feature/product/components/admin/ProductForm";
import { useCreateProduct } from "@/feature/product/hooks/useProductQuery";

export const Route = createFileRoute("/admin/products/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const { mutateAsync: createProduct, isPending } = useCreateProduct();

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

			await createProduct(formData);
			toast.success("Product created successfully");
			navigate({ to: "/admin/products" });
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "Failed to create product");
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
				<p className="text-muted-foreground">Add a new product to your catalog.</p>
			</div>
			<ProductForm onSubmit={handleSubmit} isLoading={isPending} />
		</div>
	);
}
