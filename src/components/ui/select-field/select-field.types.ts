import type { InputHelperTone } from "../input";

export type SelectFieldOption = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type SelectFieldProps = {
  defaultValue?: string;
  disabled?: boolean;
  helperText?: string;
  id?: string;
  label: string;
  name?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  options?: SelectFieldOption[];
  placeholder?: string;
  required?: boolean;
  tone?: InputHelperTone;
  value?: string;
  wrapperClassName?: string;
  triggerClassName?: string;
  "aria-describedby"?: string;
};
