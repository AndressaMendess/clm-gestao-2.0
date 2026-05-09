"use client";

import { Minus } from "lucide-react";
import { forwardRef, useEffect, useId, useRef } from "react";
import {
  getCheckboxIconStyles,
  getCheckboxIndicatorStyles,
  getCheckboxStyles,
} from "./checkbox.styles";
import type { CheckboxFieldProps, CheckboxProps } from "./checkbox.types";
import { cx } from "@/lib/cx";

function CheckmarkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 8.25L6.6 11.2L12.5 5.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
    </svg>
  );
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked, className, indeterminate = false, size = "sm", variant = "default", ...props },
  ref,
) {
  const internalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  const setRefs = (node: HTMLInputElement | null) => {
    internalRef.current = node;
    if (typeof ref === "function") {
      ref(node);
      return;
    }
    if (ref) {
      ref.current = node;
    }
  };

  const visualState = indeterminate ? "indeterminate" : checked ? "checked" : "unchecked";

  return (
    <span className="relative inline-grid place-items-center leading-none">
      <input
        ref={setRefs}
        aria-checked={indeterminate ? "mixed" : undefined}
        checked={checked}
        className={cx(getCheckboxStyles(variant, size), className)}
        data-state={visualState}
        type="checkbox"
        {...props}
      />
      <span aria-hidden className={getCheckboxIndicatorStyles(variant, size)}>
        {indeterminate ? <Minus className={getCheckboxIconStyles(size)} /> : <CheckmarkIcon className={getCheckboxIconStyles(size)} />}
      </span>
    </span>
  );
});

export function CheckboxField({
  className,
  description,
  id,
  label,
  ...props
}: CheckboxFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const descriptionId = description ? `${fieldId}-description` : undefined;

  return (
    <label
      className={cx("inline-flex cursor-pointer items-start gap-3", props.disabled && "cursor-not-allowed")}
      htmlFor={fieldId}
    >
      <Checkbox
        aria-describedby={descriptionId}
        className={className}
        id={fieldId}
        {...props}
      />
      <span className="inline-flex flex-col gap-1">
        <span className="text-sm font-medium leading-5 text-[var(--content-primary)]">{label}</span>
        {description ? (
          <span className="text-sm leading-5 text-[var(--content-secondary)]" id={descriptionId}>
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export type { CheckboxFieldProps, CheckboxProps, CheckboxSize, CheckboxVariant } from "./checkbox.types";
