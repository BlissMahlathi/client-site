import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses =
    variant === "outline"
      ? "border border-slate-200 bg-white text-slate-700"
      : variant === "secondary"
        ? "bg-sky-100 text-sky-700"
      : "bg-slate-900 text-white";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses,
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
