"use client";

import React, { forwardRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Calender } from "@/app/utils/image/icon.image";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface CustomDateInputProps {
  label?: string;
  error?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  labelGap?: number | string;
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
  ({ label, error, selected, onChange, labelGap = "8px" }, ref) => {
    const CustomInput = forwardRef<HTMLInputElement, any>((props, inputRef) => (
      <input
        ref={inputRef}
        {...props}
        className="flex-1 bg-transparent outline-none text-[14px] font-semibold text-text-secondary pl-1"
      />
    ));
    CustomInput.displayName = "CustomInput";

    return (
      <div className="flex flex-col z-20 w-full" style={{ gap: labelGap }}>
        {label && (
          <label className="text-[14px] font-semibold text-text-secondary">
            {label}
          </label>
        )}

        <div
          className={`flex items-center gap-3 px-4 py-[14px] border-[1px] border-border rounded-[64px] focus-within:ring-1 ${
            error ? "border-red-500" : ""
          }`}
        >
          <span className="flex items-center text-text-muted">
            <Image src={Calender} alt="Calendar" width={20} height={20} />
          </span>

          <DatePicker
            selected={selected}
            onChange={onChange}
            placeholderText="MM/DD/YYYY"
            dateFormat="MM/dd/yyyy"
            customInput={<CustomInput ref={ref} />}
          />
        </div>

        {error && <p className="text-[14px] text-red-500">{error}</p>}
      </div>
    );
  }
);

CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;
