import z from "zod/v4";

export const signUpBodySchema = z.object({
  firstName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Please provide a first name."
          : "Invalid first name.",
    })
    .min(1, "Please provide a first name."),
  lastName: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Please provide a last name."
          : "Invalid last name.",
    })
    .min(1, "Please provide a last name."),
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? "Please provide a valid email."
        : "Invalid email.",
  }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Please enter a password."
          : "Invalid password.",
    })
    .min(1, "Please enter a password."),
});

export const signInBodySchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? "Please provide a valid email."
        : "Invalid email.",
  }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Please enter your password."
          : "Invalid password.",
    })
    .min(1, "Please enter your password."),
});

export const verifyEmailBodySchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? "Please provide a valid email."
        : "Invalid email.",
  }),
  otp: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Please enter your OTP." : "Invalid OTP.",
    })
    .min(1, "Please enter your OTP."),
});

export const resendOtpBodySchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? "Please provide a valid email."
        : "Invalid email.",
  }),
});
