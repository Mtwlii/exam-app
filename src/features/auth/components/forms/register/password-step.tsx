import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  passwordStepSchema,
  type PasswordStepValues,
} from "@/schemas/auth.schema";

interface PasswordStepProps {
  onSubmitFinal: (data: PasswordStepValues) => void;
  isSubmittingFinal?: boolean;
  serverError?: string | null;
  onBack?: () => void;
}

export default function PasswordStep({
  onSubmitFinal,
  isSubmittingFinal,
  serverError,
  onBack,
}: PasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordStepValues>({
    resolver: zodResolver(passwordStepSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-md border px-3 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 transition ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmitFinal)} noValidate>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
      <p className="text-sm text-blue-600 font-medium mb-8">Create a strong password</p>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            aria-invalid={!!errors.password}
            className={fieldClass(!!errors.password)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("confirmPassword")}
          aria-invalid={!!errors.confirmPassword}
          className={fieldClass(!!errors.confirmPassword)}
        />
        {errors.confirmPassword && (
          <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && (
        <div className="mb-4 text-center">
          <p className="text-xs text-red-500">{serverError}</p>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Go back to edit your username
            </button>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmittingFinal}
        style={{ height: 46 }}
        className="w-full flex items-center justify-center rounded-md bg-[#155DFC] hover:bg-blue-700 disabled:opacity-60 transition text-white text-sm font-semibold"
      >
        {isSubmittingFinal ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}