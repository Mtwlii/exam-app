import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  userInfoStepSchema,
  type UserInfoStepValues,
} from "@/schemas/auth.schema";

interface UserInfoStepProps {
  onNext: (data: UserInfoStepValues) => void;
  onBack?: () => void;
  defaultValues?: Partial<UserInfoStepValues>;
}

/**
 * src/features/auth/components/forms/register/user-info-step.tsx
 */
export default function UserInfoStep({
  onNext,
  defaultValues,
}: UserInfoStepProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserInfoStepValues>({
    resolver: zodResolver(userInfoStepSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
      ...defaultValues,
    },
  });

  const onSubmit = async (values: UserInfoStepValues) => {
    onNext(values); // values.phone already includes the country code
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 transition ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
      <p className="text-sm font-semibold text-blue-600 mb-8">
        Tell us more about you
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            First name <span className="text-red-500">*</span>
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
            <p className="mt-1.5 text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Last name <span className="text-red-500">*</span>
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
            <p className="mt-1.5 text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Username <span className="text-red-500">*</span>
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

      <div className="mb-6   ">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Phone
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              defaultCountry="EG"
              international
              value={field.value}
              onChange={field.onChange}
              inputProps={{ id: "phone", "aria-invalid": !!errors.phone }}
              className={`!w-full rounded-md border bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus-within:ring-2 transition ${
                errors.phone
                  ? "border-red-400 focus-within:ring-red-100"
                  : "border-slate-300 focus-within:ring-blue-100"
              }`}
            />
          )}
        />
        {errors.phone && (
          <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{ height: 46 }}
        className="w-full flex items-center justify-center gap-2.5 rounded-md border bg-[#EFF6FF] border-[#155DFC] text-[#155DFC] text-sm font-semibold disabled:opacity-60 transition hover:bg-blue-100"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </form>
  );
}
