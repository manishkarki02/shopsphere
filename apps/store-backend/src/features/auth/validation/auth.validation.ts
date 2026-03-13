import { z } from "zod";

import { signUpBodySchema, signInBodySchema, verifyEmailBodySchema, resendOtpBodySchema } from "@shop-sphere/shared";

export const signUpSchema = z.object({
    body: signUpBodySchema,
});

export const signInSchema = z.object({
    body: signInBodySchema,
});

export const verifyEmailSchema = z.object({
    body: verifyEmailBodySchema,
});

export const resendOtpSchema = z.object({
    body: resendOtpBodySchema,
});

export type SignUpSchema = z.infer<typeof signUpSchema>["body"];
export type SignInSchema = z.infer<typeof signInSchema>["body"];
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>["body"];
export type ResendOtpSchema = z.infer<typeof resendOtpSchema>["body"];
