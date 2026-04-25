'use client'

import { Controller } from "react-hook-form";
import Image from "next/image";
import { Button, InputField, Modal, PasswordInputField } from "../ui";
import CustomDateInput from "./DatePicker";
import { CustomSelect } from "../ui/CustomSelectField";
import { useCreateUserForm } from "@/app/hooks";
import { createUserFormFields } from "@/app/config/formConfigs/createUserFormConfig";

type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateUserForm({ open, onClose }: CreateUserModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    validationRules,
    onSubmit,
    isSubmitting,
  } = useCreateUserForm(onClose);

  const fields = createUserFormFields;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col max-h-[calc(100vh-100px)] rounded-[24px] bg-form ">
        {/* ================= HEADER (STICKY) ================= */}
        <div className="sticky top-0 z-10 bg-form px-5 pt-5 pb-4 ">
          <h2 className="text-[20px] font-extrabold text-text">Create User</h2>
          <p className="text-[16px] font-medium text-text-muted">
            Add new user to the system
          </p>
        </div>

        {/* ================= FORM BODY (SCROLLABLE) ================= */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto hide-scrollbar px-5 pt-5 pb-5 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {/* Username */}
            <InputField
              label={fields.username.label}
              inputSize="FormInputSize"
              leftIcon={<Image alt="User" src={fields.username.icon} width={20} height={20} />}
              placeholder={fields.username.placeholder}
              error={errors.username?.message}
              labelGap="8px"
              variant="FormInput"
              {...register("username", validationRules.username)}
            />

            {/* Email */}
            <InputField
              label={fields.email.label}
              inputSize="FormInputSize"
              leftIcon={<Image alt="Mail" src={fields.email.icon} width={20} height={20} />}
              placeholder={fields.email.placeholder}
              error={errors.email?.message}
              labelGap="8px"
               variant="FormInput"
              {...register("email", validationRules.email)}
            />

            {/* Password */}
            <PasswordInputField
              label={fields.password.label}
              placeholder={fields.password.placeholder}
              error={errors.password?.message}
              {...register("password", validationRules.password)}
            />

            {/* Confirm Password */}
            <PasswordInputField
              label={fields.confirmPassword.label}
              placeholder={fields.confirmPassword.placeholder}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", validationRules.confirmPassword)}
            />

            {/* Date of Birth */}
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <CustomDateInput
                  label={fields.dob.label}
                  selected={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {/* Gender */}
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label={fields.gender.label}
                  options={fields.gender.options}
                  value={field.value}
                  onChange={field.onChange}
                  leftIcon={<Image src={fields.gender.icon} alt="Gender" width={20} height={20} />}
                  error={errors.gender?.message}
                />
              )}
            />

            {/* Diamond Balance */}
            <InputField
              label={fields.diamondBalance.label}
              inputSize="FormInputSize"
              type="number"
              leftIcon={<Image alt="Diamond" src={fields.diamondBalance.icon} width={20} height={20} />}
              placeholder={fields.diamondBalance.placeholder}
              labelGap="8px"
               variant="FormInput"
              {...register("diamondBalance", { valueAsNumber: true })}
            />

            {/* Gold Balance */}
            <InputField
              label={fields.goldBalance.label}
              inputSize="FormInputSize"
              type="number"
              leftIcon={<Image alt="Gold" src={fields.goldBalance.icon} width={20} height={20} />}
              placeholder={fields.goldBalance.placeholder}
              labelGap="8px"
               variant="FormInput"
              {...register("goldBalance", { valueAsNumber: true })}
            />
          </div>
        </form>

        {/* ================= ACTIONS (STICKY BOTTOM) ================= */}
        <div className="sticky bottom-0 z-10 bg-form px-5 py-4  flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            className="py-[9px] px-[22px]"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="success"
            className="py-[9px] px-[22px]"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
