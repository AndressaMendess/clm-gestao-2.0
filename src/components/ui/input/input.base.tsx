import { forwardRef, useId } from "react";
import { cx } from "@/lib/cx";
import {
  getInputFieldStyles,
  getInputHelperStyles,
  inputFieldLabelStyles,
  inputFieldWrapperStyles,
} from "./input.styles";
import type { InputProps } from "./input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    helperText,
    helperTone,
    id,
    label,
    showLabel = true,
    tone,
    wrapperClassName,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [props["aria-describedby"], helperId].filter(Boolean).join(" ") || undefined;
  const resolvedTone = tone ?? helperTone ?? "default";
  const isInvalid = props["aria-invalid"] ?? resolvedTone === "error";

  const inputElement = (
    <input
      {...props}
      aria-describedby={describedBy}
      aria-invalid={isInvalid}
      className={cx(getInputFieldStyles(resolvedTone), className)}
      id={inputId}
      ref={ref}
    />
  );

  if (!label && !helperText) {
    return inputElement;
  }

  return (
    <div className={cx(inputFieldWrapperStyles, wrapperClassName)}>
      {showLabel && label ? (
        <label className={inputFieldLabelStyles} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      {inputElement}
      {helperText ? (
        <p className={getInputHelperStyles(resolvedTone)} id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
