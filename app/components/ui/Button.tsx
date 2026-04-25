"use client";

import React from "react";
import { cn } from "@/app/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "authButton"
    | "variant2"
    | "create"
    | "reject"
    | "setting";

  size?:
    | "sm"
    | "md"
    | "lg"
    | "authBtnSize"
    | "v2Btn"
    | "createBtnSize"
    | "rejectBtnSize"
    | "paymentSize"
    | "profileBtnSize";

  loading?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "min-w-0 font-semibold focus:outline-none focus:ring-1 focus:ring-offset-1 transition-colors rounded-[64px] flex items-center justify-center whitespace-nowrap cursor-pointer";

  const variantClasses = {
    primary:
      "bg-blue text-[14px] text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-20 disabled:cursor-not-allowed",
    secondary:
      "bg-border text-[14px] text-text-muted hover:bg-gray-700 focus:ring-gray-500",
    danger:
      "bg-red text-white hover:bg-red-700 text-[14px] focus:ring-red-500 disabled:opacity-20 disabled:cursor-not-allowed",
    success:
      "bg-green text-[14px] text-black hover:bg-green-700 focus:ring-green-500 disabled:opacity-20 disabled:cursor-not-allowed",
    authButton: "bg-green font-medium text-black text-[16px] leading-[26px]",
    variant2: "text-black text-[14px] leading-[18px]",
    create: "text-black font-normal text-[16px] leading-[24px]",
    reject: "text-white font-semibold text-[14px] leading-[18px]",
    setting: "text-text-secondary font-semibold text-[14px] leading-[18px]",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm rounded-md",
    md: "px-3 py-2 lg:px-4 lg:py-3 rounded-[64px]",
    lg: "px-6 py-3 text-lg rounded-md",
    authBtnSize: "px-4 py-[14px]",
    v2Btn: "px-4 py-4 rounded-[64px]",
    createBtnSize: "px-[22px] py-[9px] rounded-[40px]",
    rejectBtnSize: "px-[12px] py-[11px] rounded-[40px]",
    paymentSize: "p-4",
    profileBtnSize: "px-[10px] md:px-[22px] py-[4px] rounded-[28px] ",
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2 shrink-0">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
          <span className="text-[14px]">Loading...</span>
        </div>
      ) : (
        <>
          {leftIcon && (
            <span className="shrink-0 flex items-center sm:mr-2 mr-1">
              {leftIcon}
            </span>
          )}
          <span className="min-w-0">{children}</span>
        </>
      )}
    </button>
  );
};
