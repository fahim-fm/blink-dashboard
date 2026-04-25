"use client";

import React from "react";
import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  leftIcon?: React.ReactNode; // now fully dynamic
  error?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  leftIcon,
  error,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      {/* Label */}
      <label className="text-[14px] font-semibold leading-[20px] text-text-secondary">
        {label}
      </label>

      {/* Select Container */}
      <div
        className={clsx(
          "flex items-center border-[1px] border-border rounded-[64px] px-4 py-[14px] gap-2",
          error && "border-red-500"
        )}
      >
        {/* Left Icon */}
        {leftIcon && <span className="flex items-center">{leftIcon}</span>}

        {/* Select */}
       <select
  value={value ?? ""}
  onChange={(e) => onChange(e.target.value)}
  className={clsx(
    "flex-1 bg-form outline-none font-semibold text-[14px] h-full",
    value ? "text-text-secondary" : "text-text-muted"
  )}
>
  <option value="" disabled>
    Select {label}
  </option>

  {options.map((opt) => (
    <option key={opt.value} value={opt.value}>
      {opt.label}
    </option>
  ))}
</select>

      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-[14px] leading-[18px]">{error}</p>
      )}
    </div>
  );
};
