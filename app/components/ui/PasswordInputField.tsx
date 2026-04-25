// app/components/ui/PasswordInputField.tsx
'use client'

import { useState, forwardRef } from "react";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { InputField } from "./InputField";
import { Lock } from "@/app/utils/image/icon.image";

type PasswordInputFieldProps = {
  label: string;
  placeholder: string;
  error?: string;
  name: string;
  labelGap?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const PasswordInputField = forwardRef<HTMLInputElement, PasswordInputFieldProps>(
  ({ label, placeholder, error, labelGap = "8px", ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <InputField
        ref={ref}
        label={label}
        inputSize="FormInputSize"
        type={showPassword ? "text" : "password"}
        leftIcon={<Image alt="Lock" src={Lock} width={20} height={20} />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
        placeholder={placeholder}
        error={error}
        labelGap={labelGap}
        {...rest}
      />
    );
  }
);

PasswordInputField.displayName = "PasswordInputField";