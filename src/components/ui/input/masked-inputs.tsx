"use client";

import { forwardRef } from "react";
import type { ChangeEvent } from "react";
import { Input } from "./input.base";
import type { InputProps } from "./input.types";
import { formatCep, formatCpf, formatPhone, formatRg, onlyDigits } from "./masked-input.utils";

type MaskedInputProps = Omit<InputProps, "defaultValue" | "onChange" | "value"> & {
  defaultValue?: string;
  onChange?: InputProps["onChange"];
  onValueChange?: (rawValue: string, maskedValue: string) => void;
  value?: string;
};

function applyMaskValue(value: string | undefined, formatter: (value: string) => string): string | undefined {
  if (typeof value !== "string") return value;
  return formatter(value);
}

function createMaskedChangeHandler(
  formatter: (value: string) => string,
  onChange?: InputProps["onChange"],
  onValueChange?: (rawValue: string, maskedValue: string) => void,
) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = formatter(event.currentTarget.value);
    event.currentTarget.value = maskedValue;
    onValueChange?.(onlyDigits(maskedValue), maskedValue);
    onChange?.(event);
  };
}

export const CpfInput = forwardRef<HTMLInputElement, MaskedInputProps>(function CpfInput(
  { defaultValue, onChange, onValueChange, value, ...props },
  ref,
) {
  return (
    <Input
      {...props}
      defaultValue={applyMaskValue(defaultValue, formatCpf)}
      inputMode="numeric"
      maxLength={14}
      onChange={createMaskedChangeHandler(formatCpf, onChange, onValueChange)}
      ref={ref}
      value={applyMaskValue(value, formatCpf)}
    />
  );
});

export const RgInput = forwardRef<HTMLInputElement, MaskedInputProps>(function RgInput(
  { defaultValue, onChange, onValueChange, value, ...props },
  ref,
) {
  return (
    <Input
      {...props}
      defaultValue={applyMaskValue(defaultValue, formatRg)}
      inputMode="text"
      maxLength={12}
      onChange={createMaskedChangeHandler(formatRg, onChange, onValueChange)}
      ref={ref}
      value={applyMaskValue(value, formatRg)}
    />
  );
});

export const PhoneInput = forwardRef<HTMLInputElement, MaskedInputProps>(function PhoneInput(
  { defaultValue, onChange, onValueChange, value, ...props },
  ref,
) {
  return (
    <Input
      {...props}
      defaultValue={applyMaskValue(defaultValue, formatPhone)}
      inputMode="tel"
      maxLength={15}
      onChange={createMaskedChangeHandler(formatPhone, onChange, onValueChange)}
      ref={ref}
      value={applyMaskValue(value, formatPhone)}
    />
  );
});

export const CepInput = forwardRef<HTMLInputElement, MaskedInputProps>(function CepInput(
  { defaultValue, onChange, onValueChange, value, ...props },
  ref,
) {
  return (
    <Input
      {...props}
      defaultValue={applyMaskValue(defaultValue, formatCep)}
      inputMode="numeric"
      maxLength={9}
      onChange={createMaskedChangeHandler(formatCep, onChange, onValueChange)}
      ref={ref}
      value={applyMaskValue(value, formatCep)}
    />
  );
});

export type { MaskedInputProps };
