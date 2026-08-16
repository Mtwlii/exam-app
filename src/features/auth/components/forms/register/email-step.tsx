import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { emailStepSchema, type EmailStepValues } from "@/schemas/auth.schema";
import { useSendEmailVerification } from "../../../apis/mutations/use-send-email-verification";

interface EmailStepProps {
  onNext: (data: EmailStepValues) => void;
  defaultEmail?: string;
}

/**
 * src/features/auth/components/forms/register/email-step.tsx
 */
export default function EmailStep({
  onNext,
  defaultEmail = "",
}: EmailStepProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailStepValues>({
    resolver: zodResolver(emailStepSchema),
    defaultValues: { email: defaultEmail },
  });

  const { mutate, isPending } = useSendEmailVerification();

  const onSubmit = (values: EmailStepValues) => {
    mutate(values, {
      onSuccess: (data) => {
        if (!data.status) {
          setError("email", {
            type: "manual",
            message: data.message ?? "Something went wrong",
          });
          return;
        }
        onNext(values);
      },
      onError: (error) => {
        setError("email", {
          type: "manual",
          message: error instanceof Error ? error.message : "Network error",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Create Account
      </h2>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          aria-invalid={!!errors.email}
          className={`w-full rounded-md border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 transition ${
            errors.email
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        style={{ height: 46 }}
        className="w-full flex items-center justify-center gap-2.5 rounded-md border bg-[#EFF6FF] border-[#155DFC] text-[#155DFC] text-sm font-semibold disabled:opacity-60 transition hover:bg-blue-100"
      >
        {isPending ? (
          "Sending code..."
        ) : (
          <>
            Next
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-slate-500 mt-5">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Login
        </a>
      </p>
    </form>
  );
}
