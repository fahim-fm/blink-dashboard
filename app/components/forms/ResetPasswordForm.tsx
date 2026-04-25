"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, InputField } from "@/app/components";
import { Eye, EyeOff, Lock } from "@/app/utils/image/icon.image";

interface ResetPasswordFormData {
  password: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormData>({
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const password = watch("password");

  /* Password Rules */
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumberOrSymbol = /[\d\W]/.test(password);
  const hasMinLength = password.length >= 8;

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      // TODO: API CALL → /api/auth/reset-password
      console.log("New Password:", data.password);

      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* New Password */}
      <InputField
        label="Type New Password*"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        leftIcon={
          <Image src={Lock.src ?? Lock} alt="Lock" width={18} height={18} />
        }
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="focus:outline-none"
          >
            <Image
              src={
                (showPassword ? Eye : EyeOff).src ??
                (showPassword ? Eye : EyeOff)
              }
              alt="Toggle password"
              width={18}
              height={18}
            />
          </button>
        }
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Minimum 8 characters",
          },
          validate: {
            hasLetter: (value) =>
              /[A-Za-z]/.test(value) || "At least one letter required",
            hasNumberOrSymbol: (value) =>
              /[\d\W]/.test(value) || "At least one number or symbol required",
          },
        })}
      />

      <div className="space-y-2 text-sm">
        <p className="font-normal text-text-muted">Secure your password:</p>

        <p
          className={
            password.length === 0
              ? "text-text-muted"
              : hasLetter
              ? "text-green-dark"
              : "text-red"
          }
        >
          • At least one letter
        </p>

        <p
          className={
            password.length === 0
              ? "text-text-muted"
              : hasNumberOrSymbol
              ? "text-green-dark"
              : "text-red"
          }
        >
          • At least one number or symbol
        </p>

        <p
          className={
            password.length === 0
              ? "text-text-muted"
              : hasMinLength
              ? "text-green-dark"
              : "text-red"
          }
        >
          • Minimum 8 characters
        </p>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="authButton"
        size="authBtnSize"
        className="w-full"
        loading={isLoading}
        disabled={!isValid}
      >
        Continue
      </Button>
    </form>
  );
}
