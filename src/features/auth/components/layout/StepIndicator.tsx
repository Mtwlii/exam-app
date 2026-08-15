interface StepIndicatorProps {
  totalSteps: number;
  currentIndex: number;
}

export default function StepIndicator({
  totalSteps,
  currentIndex,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full mt-0 mb-5">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isLast = i === totalSteps - 1;

        return (
          <div
            key={i}
            className={`flex items-center ${isLast ? "" : "flex-1"}`}
          >
            <span
              className={`block rotate-45 shrink-0 transition-all ${
                isCurrent
                  ? "h-2.5 w-2.5 bg-blue-600 ring-4 ring-blue-100"
                  : isCompleted
                  ? "h-2 w-2 bg-blue-600"
                  : "h-2 w-2 bg-white border-2 border-blue-300"
              }`}
            />

            {!isLast && (
              <span
                className={`flex-1 h-px ${
                  i < currentIndex
                    ? "bg-blue-600"
                    : "border-t-2 border-dashed border-blue-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}