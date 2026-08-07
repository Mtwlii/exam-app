import * as React from "react"

import { cn } from "@/shared/utils/tailwind-cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        // Layout
        "flex items-center gap-2",
        // Colors
        "text-gray-800",
        // Typography
        "leading-none font-medium select-none",
        // Disabled state (group)
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        // Disabled state (peer)
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
