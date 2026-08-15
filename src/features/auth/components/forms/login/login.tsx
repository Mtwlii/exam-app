import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginSchema, type ILoginFormValues } from "@/schemas/auth.schema";
import { useLogin } from "../../../apis/mutations/use-login";
import AuthLayout from "../../layout/AuthLayout";

/**
 * src/features/auth/components/forms/login/login-form.tsx
 */
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (values: ILoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        if (!data.status) {
          setError("root", {
            type: "manual",
            message: data.message ?? "Invalid username or password",
          });
          return;
        }
        localStorage.setItem("token", data.payload.token);
        navigate("/diplomas");
      },
      onError: (error) => {
        setError("root", {
          type: "manual",
          message: error instanceof Error ? error.message : "Network error",
        });
      },
    });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Login</h2>

        <div className="mb-5">
          <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="user123"
            {...register("username")}
            aria-invalid={!!errors.username}
            className={`w-full rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 transition ${
              errors.username
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.username && (
            <p className="mt-1.5 text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-2">
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
              className={`w-full rounded-md border px-3 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 transition ${
                errors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
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

        <div className="text-right mb-6">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Forgot your password?
          </a>
        </div>

        {errors.root && (
          <p className="mb-4 text-xs text-red-500">{errors.root.message}</p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition text-white text-sm font-semibold py-2.5 mb-5"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Create yours
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}