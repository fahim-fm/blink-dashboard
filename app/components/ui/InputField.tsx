"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";
import { cn } from "@/app/utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: string | React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  variant?: "authInput" | "FormInput";
  inputSize?: "authInputSize" | "FormInputSize";
  type?: "text" | "email" | "password" | "number" | "date";
  readOnly?: boolean;
  className?: string;
  labelGap?: number | string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      leftIcon,
      rightIcon,
      error,
      variant = "authInput",
      inputSize = "authInputSize",
      type = "text",
      readOnly = false,
      className = "",
      labelGap = "6px",
      ...props
    },
    ref
  ) => {
    /* Base styles */
    const baseContainerClasses =
      "flex items-center w-full min-w-0 transition-colors focus-within:ring-1";

    const baseInputClasses =
      "flex-1 min-w-0 bg-transparent outline-none placeholder:text-text-muted text-[14px]  leading-[18px] text-text-secondary";

    /* Variant styles */
    const variantClasses = {
      authInput:
        "border border-border rounded-[64px] focus-within:border-text-muted ",
      FormInput:
        "border border-border rounded-[64px] focus-within:border-text-muted font-semibold placeholder:font-semibold",
    };

    /* Size styles */
    const sizeClasses = {
      authInputSize: "px-4 py-3 gap-3 border-2",
      FormInputSize: "px-4 py-[14px] gap-2 border",
    };

    /* Label variant styles */
    const labelVariantClasses = {
      authInput: "font-medium",
      FormInput: "font-semibold",
    
    };
    return (
      <div className="flex flex-col w-full" style={{ gap: labelGap }}>
        {/* Label */}
         {label && (
          <label className={cn(
            "text-[14px] leading-[20px] text-text-secondary",
            labelVariantClasses[variant]
          )}>
            {label}
          </label>
        )}

        {/* Input Container */}
        <div
          className={cn(
            baseContainerClasses,
            variantClasses[variant],
            sizeClasses[inputSize],
            error && "border-red-500",
            readOnly && "bg-border cursor-not-allowed"
          )}
        >
          {/* Left Icon */}
          {leftIcon && (
            <span className="flex items-center shrink-0 text-text-muted">
              {leftIcon}
            </span>
          )}

          {/* Input */}
          <input
            {...props}
            ref={ref}
            type={type}
            readOnly={readOnly}
            className={cn(
              baseInputClasses,
              className,
              "h-full",
              readOnly && "cursor-default text-text-muted"
            )}
          />

          {/* Right Icon */}
          {rightIcon && (
            <span className="flex items-center shrink-0 text-text-muted cursor-pointer">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-[14px] leading-[18px] text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
