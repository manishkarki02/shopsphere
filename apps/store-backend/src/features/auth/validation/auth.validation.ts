import {
	resendOtpBodySchema,
	signInBodySchema,
	signUpBodySchema,
	verifyEmailBodySchema,
	type ResendOtpBody,
	type SignInBody,
	type SignUpBody,
	type VerifyEmailBody,
} from "@shop-sphere/shared";
import { z } from "zod";

export const signUpSchema = z.object({
	body: signUpBodySchema as unknown as z.ZodType<SignUpBody>,
});

export const signInSchema = z.object({
	body: signInBodySchema as unknown as z.ZodType<SignInBody>,
});

export const verifyEmailSchema = z.object({
	body: verifyEmailBodySchema as unknown as z.ZodType<VerifyEmailBody>,
});

export const resendOtpSchema = z.object({
	body: resendOtpBodySchema as unknown as z.ZodType<ResendOtpBody>,
});

export type SignUpSchema = SignUpBody;
export type SignInSchema = SignInBody;
export type VerifyEmailSchema = VerifyEmailBody;
export type ResendOtpSchema = ResendOtpBody;
