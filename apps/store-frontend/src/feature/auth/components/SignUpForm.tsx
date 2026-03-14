import { zodResolver } from "@hookform/resolvers/zod";
import { type SignUpBody, signUpBodySchema } from "@shop-sphere/shared";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCustomMutation } from "@/common/hooks/useCustomMutation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "../auth.service";

// Extend the shared schema to include confirm password locally
const signUpSchema = signUpBodySchema
	.extend({
		confirmPassword: z.string().min(1, "Please confirm your password."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpSchema),
	});

	const { mutate: registerAccount, isPending } = useCustomMutation<
		SignUpBody,
		any
	>({
		api: registerUser,
		success: "Registration successful! Please verify your email.",
		onSuccess: (_, variables) => {
			// Pass email via search params to the verify page
			navigate({ to: "/auth/verify", search: { email: variables.email } });
		},
	});

	const onSubmit = (values: SignUpFormValues) => {
		registerAccount({
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password,
		});
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Create an account</CardTitle>
				<CardDescription>
					Enter your details below to start shopping
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="firstName">First Name</Label>
							<Input
								id="firstName"
								placeholder="John"
								{...register("firstName")}
							/>
							{errors.firstName && (
								<p className="text-sm text-destructive">
									{errors.firstName.message}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								id="lastName"
								placeholder="Doe"
								{...register("lastName")}
							/>
							{errors.lastName && (
								<p className="text-sm text-destructive">
									{errors.lastName.message}
								</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="user@example.com"
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-sm text-destructive">{errors.email.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							{...register("password")}
						/>
						{errors.password && (
							<p className="text-sm text-destructive">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							placeholder="••••••••"
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword && (
							<p className="text-sm text-destructive">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Creating account..." : "Create account"}
					</Button>

					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link to="/auth/login" className="text-primary hover:underline">
							Log in
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
