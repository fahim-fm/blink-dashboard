// app/components/forms/FormFieldRenderer.tsx
import Image, { StaticImageData } from "next/image";
import { LucideIcon } from "lucide-react";
import { InputField } from "../ui";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import type { ComponentProps } from "react";

type InputType = NonNullable<ComponentProps<typeof InputField>["type"]>;

export type FormFieldConfig = {
  name: string;
  label: string;
  icon?: StaticImageData | LucideIcon;
  iconType?: "lucide" | "image";
  type: InputType | "select";
  readOnly?: boolean;
  options?: Array<{ value: string; label: string }>;
};

type FormFieldRendererProps<T extends FieldValues> = {
  field: FormFieldConfig;
  register: UseFormRegister<T>;
  readOnly?: boolean;
  value?: string;
};

export function FormFieldRenderer<T extends FieldValues>({
  field,
  register,
  readOnly = false,
  value,
}: FormFieldRendererProps<T>) {
  const isReadOnly = field.readOnly ?? readOnly;
  const inputType: InputType = field.type === "select" ? "text" : field.type;

  const renderIcon = () => {
    if (!field.icon) return undefined;

    if (field.iconType === "lucide") {
      const Icon = field.icon as LucideIcon;
      return <Icon size={18} />;
    }

    return <Image src={field.icon as StaticImageData} alt={field.label} width={20} height={20} />;
  };

  return (
    <InputField
      label={field.label}
      type={inputType}
      variant="FormInput"
      inputSize="FormInputSize"
      leftIcon={renderIcon()}
      readOnly={isReadOnly}
      value={value}
      labelGap={"8px"}
      {...register(field.name as Path<T>)}
    />
  );
}