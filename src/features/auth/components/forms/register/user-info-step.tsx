import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userInfoStepSchema,
  type UserInfoStepValues,
} from "@/schemas/auth.schema";

interface UserInfoStepProps {
  onNext: (data: UserInfoStepValues) => void;
  onBack: () => void;
}

/**
 * src/features/auth/components/forms/register/user-info-step.tsx
 * Uses register() for all fields — all plain inputs.
 */
export default function UserInfoStep({ onNext, onBack }: UserInfoStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserInfoStepValues>({
    resolver: zodResolver(userInfoStepSchema),
    defaultValues: { firstName: "", lastName: "", username: "", phone: "" },
  });

  const onSubmit = async (values: UserInfoStepValues) => {
    onNext(values);
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 transition ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
      <p className="text-sm text-slate-500 mb-8">Tell us more about you.</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
            className={fieldClass(!!errors.firstName)}
          />
          {errors.firstName && (
            <p className="mt-1.5 text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1.5">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
            className={fieldClass(!!errors.lastName)}
          />
          {errors.lastName && (
            <p className="mt-1.5 text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
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
          <p className="mt-1.5 text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+201234567890"
          {...register("phone")}
          aria-invalid={!!errors.phone}
          className={fieldClass(!!errors.phone)}
        />
        {errors.phone && (
          <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition text-white text-sm font-semibold py-2.5"
      >
        Next →
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