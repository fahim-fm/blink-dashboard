// app/config/formConfigs/createUserFormConfig.ts
import { User, Mail, Lock, Gender, Diamond, Gold } from "@/app/utils/image/icon.image";

export const createUserFormFields = {
  username: {
    name: "username",
    label: "Username",
    icon: User,
    placeholder: "Enter username",
    type: "text"
  },
  email: {
    name: "email",
    label: "Email",
    icon: Mail,
    placeholder: "Enter email",
    type: "email"
  },
  password: {
    name: "password",
    label: "Password",
    icon: Lock,
    placeholder: "Enter password",
    type: "password"
  },
  confirmPassword: {
    name: "confirmPassword",
    label: "Confirm Password",
    icon: Lock,
    placeholder: "Confirm password",
    type: "password"
  },
  dob: {
    name: "dob",
    label: "Date of Birth",
    type: "date"
  },
  gender: {
    name: "gender",
    label: "Gender",
    icon: Gender,
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" }
    ]
  },
  diamondBalance: {
    name: "diamondBalance",
    label: "Diamond Balance",
    icon: Diamond,
    placeholder: "Enter diamond balance",
    type: "number"
  },
  goldBalance: {
    name: "goldBalance",
    label: "Gold Balance",
    icon: Gold,
    placeholder: "Enter gold balance",
    type: "number"
  }
};

export const createUserValidationRules = {
  username: { required: "Username is required" },
  email: {
    required: "Email is required",
    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
  },
  password: {
    required: "Password is required",
    minLength: { value: 6, message: "Minimum 6 characters" }
  }
};