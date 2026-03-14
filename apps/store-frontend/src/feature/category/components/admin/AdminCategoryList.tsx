import { useState } from "react";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
	useGetCategories,
	useCreateCategory,
	useUpdateCategory,
	useDeleteCategory,
} from "@/feature/category/hooks/useCategoryQuery";
import type { ICategory } from "@/feature/category/category.service";

export function AdminCategoryList() {
	const { data: response, isLoading } = useGetCategories();
	const categories: ICategory[] = (response?.data as any) || [];

	const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategory();
	const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateCategory();
	const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteCategory();

	const [dialogOpen, setDialogOpen] = useState(false);
	const [editing, setEditing] = useState<ICategory | null>(null);
	const [name, setName] = useState("");
	const [iconFile, setIconFile] = useState<File | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const openCreate = () => {
		setEditing(null);
		setName("");
		setIconFile(null);
		setDialogOpen(true);
	};

	const openEdit = (cat: ICategory) => {
		setEditing(cat);
		setName(cat.name || cat.categoryName || "");
		setIconFile(null);
		setDialogOpen(true);
	};

	const handleSave = async () => {
		if (!name.trim()) {
			toast.error("Category name is required");
			return;
		}
		const formData = new FormData();
		formData.append("name", name.trim());
		if (iconFile) {
			formData.append("icon", iconFile);
		}
		try {
			if (editing) {
				await updateCategory({ id: editing._id, formData });
				toast.success("Category updated");
			} else {
				if (!iconFile) {
					toast.error("Please select an icon image");
					return;
				}
				await createCategory(formData);
				toast.success("Category created");
			}
			setDialogOpen(false);
		} catch (err: any) {
			toast.error(err?.response?.data?.message || "Operation failed");
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this category?")) return;
		setDeletingId(id);
		try {
			await deleteCategory(id);
			toast.success("Category deleted");
		} catch (err: any) {
			toast.error(err?.response?.data?.message || "Delete failed");
		} finally {
			setDeletingId(null);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Categories</h1>
					<p className="text-muted-foreground">Manage product categories</p>
				</div>
				<Button onClick={openCreate}>
					<PlusCircle className="mr-2 h-4 w-4" />
					Add Category
				</Button>
			</div>

			<div className="rounded-lg border bg-white shadow-sm overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-muted/50 text-left">
						<tr>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Icon</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground">Name</th>
							<th className="px-4 py-3 font-semibold text-muted-foreground text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{isLoading
							? Array.from({ length: 5 }).map((_, i) => (
									<tr key={i}>
										<td className="px-4 py-3"><Skeleton className="w-10 h-10 rounded-full" /></td>
										<td className="px-4 py-3"><Skeleton className="w-40 h-4" /></td>
										<td className="px-4 py-3"><Skeleton className="w-20 h-8 ml-auto" /></td>
									</tr>
								))
							: categories.length === 0
								? (
										<tr>
											<td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">
												No categories found. Create one!
											</td>
										</tr>
									)
								: categories.map((cat) => (
										<tr key={cat._id} className="hover:bg-muted/50 transition-colors">
											<td className="px-4 py-3">
												{cat.icon ? (
													<img src={cat.icon} alt={cat.name} className="w-10 h-10 object-cover rounded-md" />
												) : (
													<div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">N/A</div>
												)}
											</td>
											<td className="px-4 py-3 font-medium">{cat.name || cat.categoryName}</td>
											<td className="px-4 py-3">
												<div className="flex items-center justify-end gap-2">
													<Button
														size="sm"
														variant="outline"
														onClick={() => openEdit(cat)}
													>
														<Pencil className="h-3.5 w-3.5" />
													</Button>
													<Button
														size="sm"
														variant="destructive"
														disabled={isDeleting && deletingId === cat._id}
														onClick={() => handleDelete(cat._id)}
													>
														{isDeleting && deletingId === cat._id ? (
															<Loader2 className="h-3.5 w-3.5 animate-spin" />
														) : (
															<Trash2 className="h-3.5 w-3.5" />
														)}
													</Button>
												</div>
											</td>
										</tr>
									))}
					</tbody>
				</table>
			</div>

			{/* Create/Edit Dialog */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="sm:max-w-[400px]">
					<DialogHeader>
						<DialogTitle>{editing ? "Edit Category" : "Create Category"}</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 py-2">
						<div className="space-y-2">
							<Label htmlFor="cat-name">Category Name</Label>
							<Input
								id="cat-name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Electronics, Clothing..."
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="cat-icon">Icon Image {editing && "(leave empty to keep current)"}</Label>
							<Input
								id="cat-icon"
								type="file"
								accept="image/*"
								onChange={(e) => setIconFile(e.target.files?.[0] || null)}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSave} disabled={isCreating || isUpdating}>
							{(isCreating || isUpdating) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							{editing ? "Update" : "Create"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
