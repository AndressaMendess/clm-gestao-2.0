import type { InputHTMLAttributes } from "react";

export type CheckboxVariant = "default" | "success";
export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  indeterminate?: boolean;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
};

export type CheckboxFieldProps = CheckboxProps & {
  description?: string;
  label: string;
};
