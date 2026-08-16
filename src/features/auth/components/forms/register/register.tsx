import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import StepIndicator from "../../layout/StepIndicator";
import { useMultiStepForm } from "../../../hooks/use-multi-step-form";
import { useRegister } from "../../../apis/mutations/use-register";
import { useAuth } from "../../../context/auth-context";
import EmailStep from "./email-step";
import VerifyEmailStep from "./verify-email-step";
import UserInfoStep from "./user-info-step";
import PasswordStep from "./password-step";
import type {
  EmailStepValues,
  UserInfoStepValues,
  PasswordStepValues,
  RegisterPayload,
} from "@/schemas/auth.schema";

const REGISTER_STEPS = ["email", "verify-email", "user-info", "password"] as const;
type RegisterStep = (typeof REGISTER_STEPS)[number];

/**
 * src/features/auth/components/forms/register/register-form.tsx
 *
 * Orchestrates the 4 steps and accumulates their data into one
 * payload, submitted on the final step via POST /api/auth/register.
 *
 * Body shape confirmed from Swagger:
 * { username, email, password, confirmPassword, firstName, lastName, phone }
 */
export default function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { currentStep, stepIndex, totalSteps, goNext, goBack } =
    useMultiStepForm<RegisterStep>(REGISTER_STEPS);

  const [formData, setFormData] = useState<
    Partial<EmailStepValues & UserInfoStepValues>
  >({});
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate: register, isPending } = useRegister();

  const handleEmailNext = (data: EmailStepValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goNext();
  };

  const handleVerifyNext = () => {
    goNext();
  };

  const handleUserInfoNext = (data: UserInfoStepValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goNext();
  };

  const handleBackFromPassword = () => {
    setServerError(null);
    goBack();
  };

  const handleFinalSubmit = (data: PasswordStepValues) => {
    const payload: RegisterPayload = {
      ...(formData as EmailStepValues & UserInfoStepValues),
      ...data,
    };

    register(payload, {
      onSuccess: (result) => {
        if (!result.status) {
          setServerError(result.message ?? "Registration failed");
          return;
        }
        login(result.payload.token, result.payload.user);
        navigate("/login");
      },
      onError: (error) => {
        setServerError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      },
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case "email":
        return <EmailStep onNext={handleEmailNext} defaultEmail={formData.email} />;
      case "verify-email":
        return (
          <VerifyEmailStep
            email={formData.email ?? ""}
            onNext={handleVerifyNext}
            onBack={goBack}
          />
        );
      case "user-info":
        return (
          <UserInfoStep
            onNext={handleUserInfoNext}
            onBack={goBack}
            defaultValues={formData as Partial<UserInfoStepValues>}
          />
        );
      case "password":
        return (
          <PasswordStep
            onSubmitFinal={handleFinalSubmit}
            isSubmittingFinal={isPending}
            serverError={serverError}
            onBack={handleBackFromPassword}
          />
        );
    }
  };

  return (
    <AuthLayout
      header={<StepIndicator totalSteps={totalSteps} currentIndex={stepIndex} />}
    >
      {renderStep()}
    </AuthLayout>
  );
}