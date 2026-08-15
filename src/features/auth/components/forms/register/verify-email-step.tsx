import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyEmailStepSchema,
  type VerifyEmailStepValues,
} from "@/schemas/auth.schema";
import { useConfirmEmailVerification } from "../../../apis/mutations/use-confirm-email-verification";

interface VerifyEmailStepProps {
  email: string;
  onNext: (data: VerifyEmailStepValues) => void;
  onBack: () => void;
}


export default function VerifyEmailStep({
  email,
  onNext,
  onBack,
}: VerifyEmailStepProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<VerifyEmailStepValues>({
    resolver: zodResolver(verifyEmailStepSchema),
    defaultValues: { otp: "" },
  });

  const { mutate, isPending } = useConfirmEmailVerification();

  const onSubmit = (values: VerifyEmailStepValues) => {
    console.log("onSubmit fired", values); // TEMP: remove after debugging
    mutate(
      { email, code: values.otp },
      {
        onSuccess: (data) => {
          if (!data.status) {
            setError("otp", {
              type: "manual",
              message: data.message ?? "Invalid or expired code",
            });
            return;
          }
          onNext(values);
        },
        onError: (error) => {
          setError("otp", {
            type: "manual",
            message: error instanceof Error ? error.message : "Network error",
          });
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify OTP</h2>
      <p className="text-sm text-slate-500 mb-8">
        Enter the 6-digit code sent to <span className="font-medium">{email}</span>
      </p>

      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <div className="flex gap-3 mb-2 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={field.value[i] ?? ""}
                onChange={(e) => {
                  const digit = e.target.value.replace(/\D/g, "").slice(-1);
                  const chars = field.value.split("");
                  chars[i] = digit;
                  field.onChange(chars.join("").slice(0, 6));
                  if (digit && i < 5) inputsRef.current[i + 1]?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !field.value[i] && i > 0) {
                    inputsRef.current[i - 1]?.focus();
                  }
                }}
                className={`w-12 h-12 text-center text-lg font-semibold rounded-md border outline-none focus:ring-2 transition ${
                  errors.otp
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
            ))}
          </div>
        )}
      />
      {errors.otp && (
        <p className="text-xs text-red-500 text-center mb-6">{errors.otp.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition text-white text-sm font-semibold py-2.5 mt-4"
      >
        {isPending ? "Verifying..." : "Verify"}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full text-center text-sm text-slate-500 hover:text-slate-700 mt-4"
      >
        ← Change email
      </button>
    </form>
  );
}