import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import StepIndicator from "../../layout/StepIndicator";
import { useMultiStepForm } from "../../../hooks/use-multi-step-form";
import { useRegister } from "../../../apis/mutations/use-register";
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


export default function RegisterForm() {
  const { currentStep, stepIndex, totalSteps, goNext, goBack } =
    useMultiStepForm<RegisterStep>(REGISTER_STEPS);
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [serverError, setServerError] = useState<string | null>(null);
  const [formData, setFormData] = useState<
    Partial<EmailStepValues & UserInfoStepValues>
  >({});

  const handleEmailNext = (data: EmailStepValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goNext();
  };

  const handleVerifyNext = () => {
    // OTP itself isn't part of the final payload, just gates progression
    goNext();
  };

  const handleUserInfoNext = (data: UserInfoStepValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goNext();
  };

  const handleFinalSubmit = (data: PasswordStepValues) => {
    const payload: RegisterPayload = {
      ...(formData as EmailStepValues & UserInfoStepValues),
      ...data,
    };
    registerMutation.mutate(payload, {
      onSuccess: (res) => {
        if (!res.status) {
          setServerError(res.message ?? "Registration failed");
          return;
        }
        navigate("/login");
      },
      onError: (error) => {
        setServerError(
          error instanceof Error ? error.message : "Network error"
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
        return <UserInfoStep onNext={handleUserInfoNext} onBack={goBack} />;
      case "password":
        return (
          <PasswordStep
            onSubmitFinal={handleFinalSubmit}
            onBack={goBack}
            isSubmittingFinal={registerMutation.isPending}
            serverError={serverError}
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
