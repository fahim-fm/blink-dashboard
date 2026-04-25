// app/config/formConfigs/userDetailsFormConfig.ts
import { MapPin } from "lucide-react";
import { 
  Block, 
  Calender, 
  Clock, 
  Diamond, 
  Gold, 
  Loss, 
  MoneyBag, 
  Play, 
  User as UserIcon, 
  Win, 
  Mail, 
  Gender
} from "@/app/utils/image/icon.image";
import type { FormFieldConfig } from "@/app/components/forms/FormFieldRenderer";

export const userDetailsFormFields = {
  idCode: {
    name: "idCode",
    label: "User ID",
    icon: UserIcon,
    type: "text",
    readOnly: true,
  },
  name: {
    name: "name",
    label: "Username",
    icon: UserIcon,
    type: "text",
  },
  email: {
    name: "email",
    label: "Email",
    icon: Mail,
    type: "email",
  },
  country: {
    name: "country",
    label: "Country",
    icon: MapPin,
    type: "text",
    iconType: "lucide", // Indicates it's a Lucide icon
  },
  dateOfBirth: {
    name: "dateOfBirth",
    label: "Date of birth",
    icon: Calender,
    type: "date",
  },
  gender: {
    name: "gender",
    label: "Gender",
    icon:Gender,
    type: "select",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" },
      { value: "Other", label: "Other" },
    ],
  },
  diamondBalance: {
    name: "diamondBalance",
    label: "Diamond Balance",
    icon: Diamond,
    type: "number",
    readOnly: true,
  },
  goldBalance: {
    name: "goldBalance",
    label: "Gold Balance",
    icon: Gold,
    type: "number",
    readOnly: true,
  },
  lastLogin: {
    name: "lastLogin",
    label: "Last Login Time",
    icon: Clock,
    type: "text",
    readOnly: true,
  },
  totalMatches: {
    name: "totalMatches",
    label: "Total Matches",
    icon: Play,
    type: "number",
    readOnly: true,
  },
  totalWins: {
    name: "totalWins",
    label: "Total Wins",
    icon: Win,
    type: "number",
    readOnly: true,
  },
  totalLosses: {
    name: "totalLosses",
    label: "Total Losses",
    icon: Loss,
    type: "number",
    readOnly: true,
  },
  totalPaymentAmount: {
    name: "totalPaymentAmount",
    label: "Total Payments Amount",
    icon: MoneyBag,
    type: "text",
    readOnly: true,
  },
} satisfies Record<string, FormFieldConfig>;

export const userDetailsConstants = {
  blockIcon: Block,
  statusIcon: Gold,
};