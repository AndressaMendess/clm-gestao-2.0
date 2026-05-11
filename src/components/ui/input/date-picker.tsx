"use client";

import { CalendarDays } from "lucide-react";
import { forwardRef, useId, useRef } from "react";
import type { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from "react";
import { cx } from "@/lib/cx";
import { Input } from "./input.base";
import { formatDateMask, formatIsoToMaskedDate, parseMaskedDateToIso } from "./date-picker.utils";
import { getInputHelperStyles, inputFieldLabelStyles, inputFieldWrapperStyles } from "./input.styles";
import type { InputProps } from "./input.types";

export type DatePickerProps = Omit<InputProps, "defaultValue" | "onChange" | "type" | "value"> & {
  defaultValue?: string;
  onChange?: InputProps["onChange"];
  onDateChange?: (payload: { isoValue: string | null; maskedValue: string }) => void;
  onValueChange?: (isoValue: string | null, maskedValue: string) => void;
  value?: string;
};

function maskValue(value: string | undefined): string {
  if (!value) return "";
  if (value.includes("-")) return formatIsoToMaskedDate(value);
  return formatDateMask(value);
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    className,
    defaultValue,
    helperText,
    helperTone,
    id,
    label,
    onBlur,
    onChange,
    onDateChange,
    onKeyDown,
    onValueChange,
    showLabel = true,
    tone,
    value,
    wrapperClassName,
    ...props
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const nativeDateRef = useRef<HTMLInputElement | null>(null);
  const pickerId = useId();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [props["aria-describedby"], helperId].filter(Boolean).join(" ") || undefined;
  const resolvedTone = tone ?? helperTone ?? "default";
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? maskValue(value) : undefined;

  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      ref(node);
      return;
    }
    if (ref) ref.current = node;
  };

  const emitMasked = (maskedValue: string) => {
    const isoValue = parseMaskedDateToIso(maskedValue);
    onValueChange?.(isoValue, maskedValue);
    onDateChange?.({ isoValue, maskedValue });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = formatDateMask(event.currentTarget.value);
    event.currentTarget.value = maskedValue;
    emitMasked(maskedValue);
    onChange?.(event);
  };

  const syncNativePicker = (maskedValue: string) => {
    const isoValue = parseMaskedDateToIso(maskedValue);
    if (nativeDateRef.current) {
      nativeDateRef.current.value = isoValue ?? "";
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const maskedValue = formatDateMask(event.currentTarget.value);
    event.currentTarget.value = maskedValue;
    syncNativePicker(maskedValue);
    emitMasked(maskedValue);
    onBlur?.(event);
  };

  const openNativeCalendar = () => {
    const nativeDateInput = nativeDateRef.current;
    if (!nativeDateInput) return;

    const maskedValue = isControlled ? maskValue(value) : (inputRef.current?.value ?? "");
    syncNativePicker(maskedValue);
    if (typeof nativeDateInput.showPicker === "function") {
      nativeDateInput.showPicker();
      return;
    }
    nativeDateInput.focus();
  };

  const handleCalendarClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    openNativeCalendar();
    inputRef.current?.focus();
  };

  const handleNativeDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = formatIsoToMaskedDate(event.currentTarget.value);

    if (inputRef.current) {
      inputRef.current.value = maskedValue;
      inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      inputRef.current.focus();
    }

    emitMasked(maskedValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && (event.altKey || event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      openNativeCalendar();
    }
    onKeyDown?.(event);
  };

  const fieldRow = (
    <div className="relative">
      <Input
        {...props}
        aria-describedby={describedBy}
        aria-haspopup="dialog"
        autoComplete="bday"
        className={cx("pr-10", className)}
        defaultValue={isControlled ? undefined : maskValue(defaultValue)}
        helperText={undefined}
        id={inputId}
        inputMode="numeric"
        label={undefined}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onClick={openNativeCalendar}
        onKeyDown={handleKeyDown}
        placeholder={props.placeholder ?? "dd/mm/aaaa"}
        ref={setInputRef}
        tone={resolvedTone}
        type="text"
        value={resolvedValue}
      />

      <button
        aria-label="Abrir calendário"
        className="absolute inset-y-0 right-3 inline-flex items-center justify-center rounded-full text-[var(--content-tertiary)] transition-colors hover:text-[var(--content-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)]"
        onClick={handleCalendarClick}
        type="button"
      >
        <CalendarDays className="h-4 w-4" />
      </button>

      <input
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        id={`${pickerId}-native-calendar`}
        onChange={handleNativeDateChange}
        ref={nativeDateRef}
        tabIndex={-1}
        type="date"
      />
    </div>
  );

  if (!label && !helperText && !wrapperClassName) return fieldRow;

  return (
    <div className={cx(inputFieldWrapperStyles, wrapperClassName)}>
      {showLabel && label ? (
        <label className={inputFieldLabelStyles} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      {fieldRow}
      {helperText ? (
        <p className={getInputHelperStyles(resolvedTone)} id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
