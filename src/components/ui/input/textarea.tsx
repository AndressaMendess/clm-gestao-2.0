import { forwardRef, useId } from "react";
import { cx } from "@/lib/cx";
import {
  getInputHelperStyles,
  getTextAreaFieldStyles,
  inputFieldLabelStyles,
  inputFieldWrapperStyles,
} from "./input.styles";
import type { TextAreaProps } from "./input.types";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
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
  const textAreaId = id ?? generatedId;
  const helperId = helperText ? `${textAreaId}-helper` : undefined;
  const describedBy = [props["aria-describedby"], helperId].filter(Boolean).join(" ") || undefined;
  const resolvedTone = tone ?? helperTone ?? "default";
  const isInvalid = props["aria-invalid"] ?? resolvedTone === "error";

  const textAreaElement = (
    <textarea
      {...props}
      aria-describedby={describedBy}
      aria-invalid={isInvalid}
      className={cx(getTextAreaFieldStyles(resolvedTone), className)}
      id={textAreaId}
      ref={ref}
    />
  );

  if (!label && !helperText) {
    return textAreaElement;
  }

  return (
    <div className={cx(inputFieldWrapperStyles, wrapperClassName)}>
      {showLabel && label ? (
        <label className={inputFieldLabelStyles} htmlFor={textAreaId}>
          {label}
        </label>
      ) : null}
      {textAreaElement}
      {helperText ? (
        <p className={getInputHelperStyles(resolvedTone)} id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
