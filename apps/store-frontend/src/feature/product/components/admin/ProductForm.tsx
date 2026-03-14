import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Upload } from "lucide-react";
import { createProductBodySchema } from "@shop-sphere/shared";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetCategories } from "@/feature/category/hooks/useCategoryQuery";
import type { IProduct } from "../../product.service";

// Extend schema for frontend to handle file selection
const productFormSchema = createProductBodySchema.extend({
	images: z.any().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
	initialData?: IProduct;
	onSubmit: (data: ProductFormValues, files: File[]) => void;
	isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
	const { data: categoriesResponse } = useGetCategories();
	const categories = categoriesResponse?.data || [];

	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>(
		initialData?.images || []
	);

	const form = useForm<any>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			productName: initialData?.productName || "",
			description: initialData?.description || "",
			price: initialData?.price || 0,
			discountPercentage: initialData?.discountPercentage || 0,
			category: initialData?.category || "",
			stockQuantity: initialData?.stockQuantity || 0,
		},
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const filesArray = Array.from(e.target.files);
			setSelectedFiles((prev) => [...prev, ...filesArray]);

			const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
			setPreviewUrls((prev) => [...prev, ...newPreviews]);
		}
	};

	const removeImage = (index: number) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
		setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = (values: any) => {
		onSubmit(values, selectedFiles);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-sm border">
					<div className="space-y-6">
						<FormField
							control={form.control}
							name="productName"
							render={({ field }: { field: any }) => (
								<FormItem>
									<FormLabel>Product Name</FormLabel>
									<FormControl>
										<Input placeholder="Smartphone XL..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }: { field: any }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Detailed product features..."
											className="resize-none min-h-[120px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="price"
								render={({ field }: { field: any }) => (
									<FormItem>
										<FormLabel>Price ($)</FormLabel>
										<FormControl>
											<Input
												type="number"
												step="0.01"
												{...field}
												onChange={(e) => field.onChange(parseFloat(e.target.value))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="stockQuantity"
								render={({ field }: { field: any }) => (
									<FormItem>
										<FormLabel>Stock Quantity</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="discountPercentage"
								render={({ field }: { field: any }) => (
									<FormItem>
										<FormLabel>Discount (%)</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="category"
								render={({ field }: { field: any }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories.map((cat: any) => (
													<SelectItem key={cat._id} value={cat._id}>
														{cat.categoryName}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<div className="space-y-6">
						<FormItem>
							<FormLabel>Product Images</FormLabel>
							<FormControl>
								<div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden h-[200px]">
									<Input
										type="file"
										multiple
										accept="image/*"
										className="absolute inset-0 opacity-0 cursor-pointer h-full"
										onChange={handleFileChange}
									/>
									<Upload className="w-8 h-8 mb-2 text-gray-400" />
									<p className="text-sm">Click or drag images here to upload</p>
									<p className="text-xs text-gray-400 mt-1">
										Supports JPG, PNG, WEBP (Max 5MB each)
									</p>
								</div>
							</FormControl>
						</FormItem>

						{previewUrls.length > 0 && (
							<div className="grid grid-cols-3 gap-4">
								{previewUrls.map((url, idx) => (
									<div
										key={idx}
										className="relative aspect-square border rounded-md overflow-hidden group"
									>
										<img
											src={url}
											alt={`Preview ${idx + 1}`}
											className="w-full h-full object-cover"
										/>
										<button
											type="button"
											onClick={() => removeImage(idx)}
											className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
										>
											&times;
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="flex justify-end gap-4">
					<Button type="submit" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving...
							</>
						) : initialData ? (
							"Update Product"
						) : (
							"Create Product"
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
