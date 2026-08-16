import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { useLogin } from "../../../apis/mutations/use-login";
import { useAuth } from "../../../context/auth-context";
import AuthLayout from "../../layout/AuthLayout";


export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (values: LoginFormValues) => {
    setServerError(null);
    mutate(values, {
      onSuccess: (data) => {
        if (!data.status) {
          setServerError(data.message ?? "Invalid username or password.");
          return;
        }
        login(data.payload.token, data.payload.user);
        navigate("/");
      },
      onError: (error) => {
        setServerError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      },
    });
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 transition ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Login</h2>

        <div className="mb-5">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="user123"
            {...register("username")}
            aria-invalid={!!errors.username}
            className={fieldClass(!!errors.username)}
          />
          {errors.username && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              aria-invalid={!!errors.password}
              className={`${fieldClass(!!errors.password)} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-right mb-4">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Forgot your password?
          </a>
        </div>

        {serverError && (
          <div className="flex items-center justify-center gap-2 rounded-md bg-red-50 border border-red-500 text-red-500 text-sm px-3 py-2.5 mb-4 relative">
            <XCircle className="w-4 h-4 rounded-full bg-white absolute top-[-1px]  -translate-y-1/2" />
            <span className=" text-red-500">{serverError}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          style={{ height: 46 }}
          className="w-full flex items-center justify-center rounded-md bg-[#155DFC] hover:bg-blue-700 disabled:opacity-60 transition text-white text-sm font-semibold mb-5"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create yours
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}
