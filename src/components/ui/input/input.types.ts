import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type InputHelperTone = "default" | "error" | "success";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  helperText?: string;
  /**
   * @deprecated Use `tone`. Kept for backward compatibility.
   */
  helperTone?: InputHelperTone;
  label?: string;
  showLabel?: boolean;
  tone?: InputHelperTone;
  wrapperClassName?: string;
};

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  helperText?: string;
  /**
   * @deprecated Use `tone`. Kept for backward compatibility.
   */
  helperTone?: InputHelperTone;
  label?: string;
  showLabel?: boolean;
  tone?: InputHelperTone;
  wrapperClassName?: string;
};
