import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  passwordStepSchema,
  type PasswordStepValues,
} from "@/schemas/auth.schema";

interface PasswordStepProps {
  onSubmitFinal: (data: PasswordStepValues) => void | Promise<void>;
  onBack: () => void;
  isSubmittingFinal?: boolean;
  serverError?: string | null;
}

export default function PasswordStep({
  onSubmitFinal,
  onBack,
  isSubmittingFinal = false,
  serverError,
}: PasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordStepValues>({
    resolver: zodResolver(passwordStepSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (values: PasswordStepValues) => {
    onSubmitFinal(values);
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-md border px-3 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 transition ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Create a Strong Password</h2>
      <p className="text-sm text-slate-500 mb-8">Choose a strong password and confirm it.</p>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
          Password
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
            aria-label={showPassword ? "Hide password" : "Show password"}
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
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
            className={fieldClass(!!errors.confirmPassword)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && (
        <p className="mb-4 text-xs text-red-500 text-center">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmittingFinal}
        className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition text-white text-sm font-semibold py-2.5"
      >
        {isSubmittingFinal ? "Creating account..." : "Create Account"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full text-center text-sm text-slate-500 hover:text-slate-700 mt-4"
      >
        ← Back
      </button>
    </form>
  );
}
