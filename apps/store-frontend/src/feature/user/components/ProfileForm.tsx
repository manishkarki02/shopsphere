import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Normally we would import the base user schema from @shop-sphere/shared,
// but for the frontend profile update specific needs, we can define a client schema:
const profileFormSchema = z
	.object({
		firstName: z.string().min(1, "First Name is required").optional(),
		lastName: z.string().min(1, "Last Name is required").optional(),
		email: z.string().email().optional(),
		address: z.string().optional(),
		currentPassword: z.string().optional(),
		newPassword: z.string().min(6, "Must be at least 6 characters").optional(),
		confirmPassword: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.newPassword && !data.currentPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Current password is required to set a new password",
			path: ["currentPassword"],
		},
	)
	.refine(
		(data) => {
			if (data.newPassword && data.newPassword !== data.confirmPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Passwords do not match",
			path: ["confirmPassword"],
		},
	);

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
	// Fetch existing data here with standard react query when user session exists
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			address: "",
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (data: ProfileFormValues) => {
		try {
			// API MUTATION LOGIC
			await new Promise((res) => setTimeout(res, 1000));
			console.log(data);
			toast.success("Profile updated successfully", {
				description: "Changes have been saved to your account.",
			});
			form.reset({
				...data,
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		} catch (err) {
			toast.error("Failed to update profile", {
				description: "Please check your inputs and try again.",
			});
		}
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="space-y-6 max-w-2xl"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-2">
					<Label htmlFor="firstName">First Name</Label>
					<Input
						id="firstName"
						placeholder="First Name"
						{...form.register("firstName")}
						className={
							form.formState.errors.firstName
								? "border-destructive"
								: "bg-muted"
						}
					/>
					{form.formState.errors.firstName && (
						<p className="text-sm text-destructive">
							{form.formState.errors.firstName.message}
						</p>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="lastName">Last Name</Label>
					<Input
						id="lastName"
						placeholder="Last Name"
						{...form.register("lastName")}
						className={
							form.formState.errors.lastName ? "border-destructive" : "bg-muted"
						}
					/>
					{form.formState.errors.lastName && (
						<p className="text-sm text-destructive">
							{form.formState.errors.lastName.message}
						</p>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						placeholder="Email Address"
						{...form.register("email")}
						className={
							form.formState.errors.email ? "border-destructive" : "bg-muted"
						}
					/>
					{form.formState.errors.email && (
						<p className="text-sm text-destructive">
							{form.formState.errors.email.message}
						</p>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor="address">Address</Label>
					<Input
						id="address"
						placeholder="Shipping Address"
						{...form.register("address")}
						className={
							form.formState.errors.address ? "border-destructive" : "bg-muted"
						}
					/>
				</div>
			</div>

			<div className="pt-6 border-t font-semibold">Password Changes</div>

			<div className="space-y-4 max-w-md">
				<div className="space-y-2">
					<Input
						type="password"
						placeholder="Current Password"
						{...form.register("currentPassword")}
						className={
							form.formState.errors.currentPassword
								? "border-destructive"
								: "bg-muted"
						}
					/>
					{form.formState.errors.currentPassword && (
						<p className="text-sm text-destructive">
							{form.formState.errors.currentPassword.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<Input
						type="password"
						placeholder="New Password"
						{...form.register("newPassword")}
						className={
							form.formState.errors.newPassword
								? "border-destructive"
								: "bg-muted"
						}
					/>
					{form.formState.errors.newPassword && (
						<p className="text-sm text-destructive">
							{form.formState.errors.newPassword.message}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<Input
						type="password"
						placeholder="Confirm New Password"
						{...form.register("confirmPassword")}
						className={
							form.formState.errors.confirmPassword
								? "border-destructive"
								: "bg-muted"
						}
					/>
					{form.formState.errors.confirmPassword && (
						<p className="text-sm text-destructive">
							{form.formState.errors.confirmPassword.message}
						</p>
					)}
				</div>
			</div>

			<div className="flex justify-end gap-4 pt-4">
				<Button variant="ghost" type="button" onClick={() => form.reset()}>
					Cancel
				</Button>
				<Button
					type="submit"
					disabled={isLoading}
					className="bg-destructive hover:bg-destructive/90 text-white min-w-[140px]"
				>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
						</>
					) : (
						"Save Changes"
					)}
				</Button>
			</div>
		</form>
	);
}
