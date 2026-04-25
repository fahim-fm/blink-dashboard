"use client";

import { Edit } from "lucide-react";
import Image from "next/image";
import { User } from "@/app/types";
import { Button, StatusBadge } from "../ui";
import { FormFieldRenderer } from "./FormFieldRenderer";
import { useUserDetailsForm } from "@/app/hooks";
import {
  userDetailsFormFields,
  userDetailsConstants,
} from "@/app/config/formConfigs/userDetailsFormConfig";
import { cn } from "@/app/utils";

interface Props {
  user: User;
  onClose: () => void; // <- Add this
}

export function UserDetailsForm({ user, onClose }: Props) {
  const {
    register,
    handleSubmit,
    isEditing,
    isSubmitting,
    toggleEdit,
    onSubmit,
    handleBlockUser,
  } = useUserDetailsForm(user);

  const {
    idCode,
    name,
    email,
    country,
    dateOfBirth,
    gender,
    diamondBalance,
    goldBalance,
    lastLogin,
    totalMatches,
    totalWins,
    totalLosses,
    totalPaymentAmount,
  } = userDetailsFormFields;

  const getLeftIcon = (icon: React.ReactNode) => (isEditing ? undefined : icon);

  return (
    <div className="rounded-[24px] bg-form max-h-[calc(100vh-142px)] flex flex-col">

      {/* ================= HEADER (STICKY) ================= */}
      <div className="sticky top-0 z-10 bg-form px-5 pt-5 pb-4">
        <div className="flex items-center flex-col md:flex-row gap-6 justify-between">
          <div>
            <h2 className="text-[20px] font-extrabold text-text">
              {isEditing ? "Edit User Details" : "User Details"}
            </h2>
            <p className="text-[16px] font-medium text-text-muted">
              {isEditing
                ? "Modify only diamond and gold balance"
                : "Full details of a user"}
            </p>
          </div>

          <div className="flex gap-2 max-w-[248px] flex-col sm:flex-row w-full">
            {/* Edit / Save Button */}
            <Button
              variant="success"
              leftIcon={getLeftIcon(<Edit  className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" />)}
              onClick={toggleEdit} // just toggle edit, don't close
              disabled={isSubmitting}
              className={cn(
                "flex-1 font-semibold break-words ",
                isEditing ? "p-3 text-[12px] sm:text-[14px]" : "sm:text-[14px] text-[12px] "
              )}
            >
              {isEditing ? "Save" : "Edit Details"}
            </Button>

            {/* Cancel / Block User */}
            <Button
              variant={isEditing ? "secondary" : "danger"}
              leftIcon={getLeftIcon(
                <Image
                  src={userDetailsConstants.blockIcon}
                  alt="Block"
                  className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]"
                />
              )}
              onClick={async () => {
                if (isEditing) {
                  toggleEdit(); // cancel editing
                  onClose();    // close the form
                } else {
                  await handleBlockUser();
                  onClose();    // close the form on block
                }
              }}
              disabled={isSubmitting}
              className={cn(
                "flex-1 font-medium ",
                isEditing
                  ? "py-[9px] px-[22px] sm:text-[16px] text-[12px]"
                  : "py-[11px] px-3 sm:text-[14px] text-[12px]  "
              )}
            >
              {isEditing ? "Cancel" : "Block User"}
            </Button>
          </div>
        </div>
      </div>

      {/* ================= FORM BODY (SCROLLABLE) ================= */}
      <form
        onSubmit={handleSubmit(onSubmit)} // keep submitting for save
        className="flex-1 overflow-y-auto hide-scrollbar px-5 pt-2 pb-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">

          <FormFieldRenderer field={idCode} register={register} readOnly />
          <FormFieldRenderer field={name} register={register} readOnly />

          <FormFieldRenderer field={email} register={register} readOnly />
          <FormFieldRenderer field={country} register={register} readOnly />

          <FormFieldRenderer field={dateOfBirth} register={register} readOnly />
          <FormFieldRenderer field={gender} register={register} readOnly />

          <FormFieldRenderer
            field={{ ...diamondBalance, readOnly: !isEditing }}
            register={register}
          />
          <FormFieldRenderer
            field={{ ...goldBalance, readOnly: !isEditing }}
            register={register}
          />

          <FormFieldRenderer
            field={lastLogin}
            register={register}
            value={user.lastLogin}
            readOnly
          />
          <FormFieldRenderer field={totalMatches} register={register} readOnly />

          <FormFieldRenderer field={totalWins} register={register} readOnly />
          <FormFieldRenderer field={totalLosses} register={register} readOnly />

          <FormFieldRenderer
            field={totalPaymentAmount}
            register={register}
            value={`$ ${user.totalPaymentAmount.toLocaleString()}`}
            readOnly
          />

          <StatusBadge
            label="User Status"
            status={user.status}
            icon={userDetailsConstants.statusIcon}
          />
        </div>
      </form>
    </div>
  );
}
