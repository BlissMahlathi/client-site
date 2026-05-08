"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RadioGroupContextValue = {
  value?: string;
  onValueChange?: (value: string) => void;
  name: string;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, value, onValueChange, children, ...props }, ref) => {
  const name = React.useId();

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, name }}>
      <div ref={ref} className={cn("grid gap-2", className)} role="radiogroup" {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { value: string }
>(({ className, value, id, onChange, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const checked = context?.value === value;

  return (
    <input
      ref={ref}
      className={cn(
        "h-4 w-4 border-slate-300 text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      type="radio"
      id={id}
      name={context?.name}
      checked={checked}
      onChange={(event) => {
        onChange?.(event);
        context?.onValueChange?.(value);
      }}
      {...props}
    />
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
