import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailStepSchema, type EmailStepValues } from "@/schemas/auth.schema";
import { useSendEmailVerification } from "@/features/auth/apis/mutations/use-send-email-verification";

interface EmailStepProps {
  onNext: (data: EmailStepValues) => void;
  defaultEmail?: string;
}


export default function EmailStep({ onNext, defaultEmail = "" }: EmailStepProps) {
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
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
      <p className="text-sm text-slate-500 mb-8">Let's start with your email.</p>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
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
        className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition text-white text-sm font-semibold py-2.5"
      >
        {isPending ? "Sending code..." : "Next →"}
      </button>

      <p className="text-center text-sm text-slate-500 mt-5">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
          Login
        </a>
      </p>
    </form>
  );
}