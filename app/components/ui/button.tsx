import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline";
type ButtonSize = "default" | "sm" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function getButtonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50",
  } as const;
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8",
  } as const;

  return cn(base, variants[variant], sizes[size], className);
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const classes = getButtonClasses(variant, size, className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(classes, children.props.className),
      });
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, getButtonClasses as buttonVariants };
