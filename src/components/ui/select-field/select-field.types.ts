import type { InputHelperTone } from "../input";

export type SelectFieldOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type SelectFieldVariant = "with-label" | "without-label";

export type SelectFieldProps = {
  "aria-label"?: string;
  defaultValue?: string;
  disabled?: boolean;
  helperText?: string;
  id?: string;
  label?: string;
  name?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  options?: SelectFieldOption[];
  placeholder?: string;
  required?: boolean;
  tone?: InputHelperTone;
  variant?: SelectFieldVariant;
  value?: string;
  wrapperClassName?: string;
  triggerClassName?: string;
  "aria-describedby"?: string;
};
