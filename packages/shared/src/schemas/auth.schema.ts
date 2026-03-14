import z from "zod/v4";

export const signUpBodySchema = z.object({
	firstName: z.string().min(1, "Please provide a first name."),
	lastName: z.string().min(1, "Please provide a last name."),
	email: z.email("Please provide a valid email."),
	password: z.string().min(1, "Please enter a password."),
});

export const signInBodySchema = z.object({
	email: z.email("Please provide a valid email."),
	password: z.string().min(1, "Please Enter your password."),
});

export const verifyEmailBodySchema = z.object({
	email: z.email("Please provide a valid email."),
	otp: z.string().min(1, "Please Enter your OTP."),
});

export const resendOtpBodySchema = z.object({
	email: z.email("Please provide a valid email."),
});

export type SignUpBody = z.infer<typeof signUpBodySchema>;
export type SignInBody = z.infer<typeof signInBodySchema>;
export type VerifyEmailBody = z.infer<typeof verifyEmailBodySchema>;
export type ResendOtpBody = z.infer<typeof resendOtpBodySchema>;
