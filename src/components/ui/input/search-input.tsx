"use client";

import { Search, X } from "lucide-react";
import { forwardRef, useId, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { cx } from "@/lib/cx";
import { Input } from "./input.base";
import { getInputHelperStyles, inputFieldWrapperStyles } from "./input.styles";
import type { InputProps } from "./input.types";

export type SearchInputProps = Omit<InputProps, "type" | "label" | "showLabel"> & {
  clearAriaLabel?: string;
  onClear?: () => void;
  showClearButton?: boolean;
};

function getCurrentValue(value: string | number | readonly string[] | undefined): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  {
    className,
    clearAriaLabel = "Limpar busca",
    defaultValue,
    helperText,
    helperTone,
    id,
    onChange,
    onClear,
    onKeyDown,
    showClearButton = true,
    tone,
    value,
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
  const [innerValue, setInnerValue] = useState(getCurrentValue(defaultValue));
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? getCurrentValue(value) : innerValue;
  const hasValue = resolvedValue.length > 0;

  const handleChange: InputProps["onChange"] = (event) => {
    if (!isControlled) {
      setInnerValue(event.currentTarget.value);
    }
    onChange?.(event);
  };

  const clearValue = (target: HTMLInputElement | null) => {
    if (!target) return;

    if (!isControlled) {
      setInnerValue("");
    }

    target.value = "";
    target.dispatchEvent(new Event("input", { bubbles: true }));
    target.focus();
    onClear?.();
  };

  const handleClearClick = (event: MouseEvent<HTMLButtonElement>) => {
    const input = event.currentTarget.parentElement?.querySelector("input");
    clearValue(input ?? null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && hasValue) {
      clearValue(event.currentTarget);
      event.preventDefault();
    }
    onKeyDown?.(event);
  };

  return (
    <div className={cx(inputFieldWrapperStyles, wrapperClassName)}>
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-[var(--content-tertiary)]"
        >
          <Search className="block h-4 w-4" />
        </span>

        <Input
          {...props}
          aria-describedby={describedBy}
          aria-label={props["aria-label"] ?? "Buscar"}
          className={cx("pl-10", showClearButton ? "pr-10" : "pr-3", className)}
          defaultValue={isControlled ? undefined : defaultValue}
          id={inputId}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={ref}
          role="searchbox"
          tone={resolvedTone}
          type="text"
          value={isControlled ? value : innerValue}
        />

        {showClearButton && hasValue ? (
          <button
            aria-label={clearAriaLabel}
            className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full p-0 text-[var(--content-tertiary)] transition-colors hover:text-[var(--content-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)]"
            onClick={handleClearClick}
            type="button"
          >
            <X className="block h-4 w-4" />
          </button>
        ) : null}
      </div>

      {helperText ? (
        <p className={getInputHelperStyles(resolvedTone)} id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
