// app/hooks/useCreateUserForm.ts
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { createUserValidationRules } from "@/app/config/formConfigs/createUserFormConfig";

type CreateUserFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: Date | null;
  gender: string;
  diamondBalance: number;
  goldBalance: number;
};

export function useCreateUserForm(onSuccess: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<CreateUserFormData>({
    defaultValues: { 
      dob: null, 
      gender: "",
      diamondBalance: 0,
      goldBalance: 0
    },
  });

  const { watch } = formMethods;

  const validationRules = {
    ...createUserValidationRules,
    confirmPassword: {
      validate: (value: string) => 
        value === watch("password") || "Passwords do not match",
    },
  };

  const onSubmit = useCallback(async (data: CreateUserFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      console.log("Form Data:", {
        ...data,
        dob: data.dob ? data.dob.toISOString().split("T")[0] : "",
      });
      
      formMethods.reset();
      onSuccess();
    } catch (error) {
      console.error("Error creating user:", error);
      // TODO: Add error handling/toast notification
    } finally {
      setIsSubmitting(false);
    }
  }, [formMethods, onSuccess]);

  return {
    ...formMethods,
    validationRules,
    onSubmit,
    isSubmitting,
  };
}