import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInBody, signInBodySchema } from "@shop-sphere/shared";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
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
import { loginUser } from "../auth.service";

export default function LoginForm() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInBody>({
		resolver: zodResolver(signInBodySchema),
	});

	const { mutate: loginAccount, isPending } = useCustomMutation<
		SignInBody,
		any
	>({
		api: loginUser,
		success: "Login successful!",
		onSuccess: () => {
			navigate({ to: "/dashboard" });
		},
	});

	const onSubmit = (values: SignInBody) => {
		loginAccount(values);
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your credentials to access the dashboard
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Signing in..." : "Sign In"}
					</Button>
					<div className="mt-4 text-center text-sm">
						Don't have an account?{" "}
						<Link to="/auth/login" className="text-primary hover:underline">
							Register here
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
