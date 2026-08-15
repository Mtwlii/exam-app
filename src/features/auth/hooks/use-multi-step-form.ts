import { useState, useCallback, useMemo } from "react";


export function useMultiStepForm<T extends string>(steps: readonly T[]) {
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goToStep = useCallback(
    (step: T) => {
      const index = steps.indexOf(step);
      if (index !== -1) setStepIndex(index);
    },
    [steps]
  );

  const progress = useMemo(
    () => ((stepIndex + 1) / steps.length) * 100,
    [stepIndex, steps.length]
  );

  return {
    currentStep,
    stepIndex,
    totalSteps: steps.length,
    isFirstStep,
    isLastStep,
    progress,
    goNext,
    goBack,
    goToStep,
  };
}