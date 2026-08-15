import { z } from "zod";

/**
 * src/schemas/auth.schema.ts
 * Centralized Zod schemas for all auth-related forms.
 */

// ---- Login ----
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});
export type ILoginFormValues = z.infer<typeof loginSchema>;

// ---- Register: Step 1 - Email ----
export const emailStepSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});
export type EmailStepValues = z.infer<typeof emailStepSchema>;

// ---- Register: Step 2 - Verify Email (OTP) ----
export const verifyEmailStepSchema = z.object({
  otp: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d+$/, "Code must contain digits only"),
});
export type VerifyEmailStepValues = z.infer<typeof verifyEmailStepSchema>;

// ---- Register: Step 3 - User Info ----
export const userInfoStepSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?\d{8,15}$/, "Enter a valid phone number"),
});
export type UserInfoStepValues = z.infer<typeof userInfoStepSchema>;

// ---- Register: Step 4 - Password ----
export const passwordStepSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type PasswordStepValues = z.infer<typeof passwordStepSchema>;

// ---- Combined shape sent to POST /api/auth/register ----
export type RegisterPayload = EmailStepValues &
  UserInfoStepValues &
  PasswordStepValues;