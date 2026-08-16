import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyEmailStepSchema,
  type VerifyEmailStepValues,
} from "@/schemas/auth.schema";
import { useConfirmEmailVerification } from "../../../apis/mutations/use-confirm-email-verification";
import { useSendEmailVerification } from "../../../apis/mutations/use-send-email-verification";

interface VerifyEmailStepProps {
  email: string;
  onNext: (data: VerifyEmailStepValues) => void;
  onBack: () => void;
}

const RESEND_SECONDS = 60;

/**
 * src/features/auth/components/forms/register/verify-email-step.tsx
 */
export default function VerifyEmailStep({
  email,
  onNext,
  onBack,
}: VerifyEmailStepProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

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
  const { mutate: resend, isPending: isResending } = useSendEmailVerification();

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const onSubmit = (values: VerifyEmailStepValues) => {
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

  const handleResend = () => {
    resend(
      { email },
      {
        onSuccess: () => setSecondsLeft(RESEND_SECONDS),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create Account
      </h2>
      <p className="text-base font-semibold text-blue-600 mb-2">Verify OTP</p>
      <p className="text-sm text-slate-500 mb-8">
        Please enter the 6-digit code sent to{" "}
        <span className="font-medium text-slate-700">{email}</span>.{" "}
        <button
          type="button"
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium underline"
        >
          Edit
        </button>
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
        <p className="text-xs text-red-500 text-center mb-2">{errors.otp.message}</p>
      )}

      <p className="text-center text-xs text-slate-500 mb-6">
        {secondsLeft > 0 ? (
          <>You can request another code in: {secondsLeft}s</>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-60"
          >
            {isResending ? "Sending..." : "Resend code"}
          </button>
        )}
      </p>

      <button
        type="submit"
        disabled={isPending}
        style={{ height: 46 }}
        className="w-full flex items-center justify-center rounded-md border bg-[#EFF6FF] border-[#155DFC] text-[#155DFC] text-sm font-semibold disabled:opacity-60 transition hover:bg-blue-100"
      >
        {isPending ? "Verifying..." : "Verify Code"}
      </button>
    </form>
  );
}