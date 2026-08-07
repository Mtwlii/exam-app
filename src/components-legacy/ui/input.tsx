import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/shared/utils/tailwind-cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // Layout & Sizing
        "h-11.5 w-full min-w-0 px-2.5 py-1 rounded-lg text-base md:text-sm",
        // Border & Background
        "border border-gray-200 bg-transparent dark:bg-input/30 dark:disabled:bg-input/80",
        // Typography
        "transition-colors outline-none text-gray-800",
        // File Input
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Placeholder
        "placeholder:text-gray-400",
        // Focus
        "focus-visible:border-blue-600 focus-visible:ring-3 focus-visible:ring-blue-200",
        // Disabled State
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
        // ARIA: Invalid
        "aria-invalid:border-red-600 aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        // Hover styles
        "hover:border-blue-600",
        className
      )}
      {...props}
    />
  )
}

export { Input }
