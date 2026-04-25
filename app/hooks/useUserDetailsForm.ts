// app/hooks/useUserDetailsForm.ts
import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import { User } from "@/app/types";

export function useUserDetailsForm(user: User) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<User>();
  const { reset } = formMethods;

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const toggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const onSubmit = useCallback(async (data: User) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual API call
      console.log("UPDATED USER:", data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
      // TODO: Add error handling/toast notification
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleBlockUser = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      console.log("BLOCKING USER:", user.id);
      // TODO: Add confirmation modal before blocking
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  }, [user.id]);

  return {
    ...formMethods,
    isEditing,
    isSubmitting,
    toggleEdit,
    onSubmit,
    handleBlockUser,
  };
}