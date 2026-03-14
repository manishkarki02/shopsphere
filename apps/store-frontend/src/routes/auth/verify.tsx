import { zodResolver } from "@hookform/resolvers/zod";
import {
	type ResendOtpBody,
	resendOtpBodySchema,
	type VerifyEmailBody,
	verifyEmailBodySchema,
} from "@shop-sphere/shared";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { resendOtp, verifyOtp } from "@/feature/auth/auth.service";

// Define the search parameters schema for this route
const verifySearchSchema = z.object({
	email: z.string().email().catch(""),
});

export const Route = createFileRoute("/auth/verify")({
	validateSearch: verifySearchSchema,
	component: VerifyPage,
});

function VerifyPage() {
	const search = Route.useSearch();
	const email = (search as any)?.email;
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<VerifyEmailBody>({
		resolver: zodResolver(verifyEmailBodySchema),
		defaultValues: {
			email: email || "",
			otp: "",
		},
	});

	const { mutate: verifyAccount, isPending: isVerifying } = useCustomMutation<
		VerifyEmailBody,
		any
	>({
		api: verifyOtp,
		success: "Account verified successfully!",
		onSuccess: () => {
			navigate({ to: "/auth/login" });
		},
	});

	const { mutate: requestNewOtp, isPending: isResending } = useCustomMutation<
		ResendOtpBody,
		any
	>({
		api: resendOtp,
		success: "A new OTP has been sent to your email.",
	});

	const onSubmit = (values: VerifyEmailBody) => {
		verifyAccount(values);
	};

	const handleResend = () => {
		if (email) {
			requestNewOtp({ email });
		}
	};

	return (
		<div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Verify your account</CardTitle>
					<CardDescription>
						Enter the 6-digit OTP we sent to your email
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								readOnly={!!email}
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-sm text-destructive">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="otp">One Time Password</Label>
							<Input
								id="otp"
								type="text"
								placeholder="123456"
								maxLength={6}
								{...register("otp")}
							/>
							{errors.otp && (
								<p className="text-sm text-destructive">{errors.otp.message}</p>
							)}
						</div>

						<div className="flex flex-col gap-3 pt-2">
							<Button type="submit" className="w-full" disabled={isVerifying}>
								{isVerifying ? "Verifying..." : "Verify OTP"}
							</Button>

							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={handleResend}
								disabled={isResending || !email}
							>
								{isResending ? "Sending..." : "Resend OTP"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
