"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useId, useState } from "react";
import { cx } from "@/lib/cx";
import { Input } from "./input.base";
import { getInputHelperStyles, inputFieldWrapperStyles } from "./input.styles";
import type { InputProps } from "./input.types";

export type PasswordInputProps = Omit<InputProps, "type"> & {
  hidePasswordAriaLabel?: string;
  showPasswordAriaLabel?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  {
    className,
    helperText,
    helperTone,
    hidePasswordAriaLabel = "Ocultar senha",
    id,
    showPasswordAriaLabel = "Mostrar senha",
    tone,
    wrapperClassName,
    ...props
  },
  ref,
) {
  const [isVisible, setIsVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [props["aria-describedby"], helperId].filter(Boolean).join(" ") || undefined;
  const resolvedTone = tone ?? helperTone ?? "default";

  return (
    <div className={cx(inputFieldWrapperStyles, wrapperClassName)}>
      <div className="relative">
        <Input
          {...props}
          aria-describedby={describedBy}
          className={cx("pr-10", className)}
          helperText={undefined}
          id={inputId}
          ref={ref}
          tone={resolvedTone}
          type={isVisible ? "text" : "password"}
        />

        <button
          aria-label={isVisible ? hidePasswordAriaLabel : showPasswordAriaLabel}
          className="absolute right-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--content-tertiary)] transition-colors hover:text-[var(--content-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)]"
          onClick={() => setIsVisible((currentValue) => !currentValue)}
          type="button"
        >
          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {helperText ? (
        <p className={getInputHelperStyles(resolvedTone)} id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
