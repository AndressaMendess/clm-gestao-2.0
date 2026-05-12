"use client";

import { ChevronDown } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { useId } from "react";
import { cx } from "@/lib/cx";
import {
  getSelectFieldHelperStyles,
  getSelectFieldStyles,
  selectFieldContentStyles,
  selectFieldItemStyles,
  selectFieldLabelStyles,
  selectFieldViewportStyles,
  selectFieldWrapperStyles,
} from "./select-field.styles";
import type { SelectFieldProps } from "./select-field.types";

const NONE_VALUE = "__select_none__";

export function SelectField({
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  defaultValue,
  disabled,
  helperText,
  id,
  label,
  name,
  onChange,
  onValueChange,
  options,
  placeholder = "Selecione",
  required,
  tone = "default",
  variant = "with-label",
  triggerClassName,
  value,
  wrapperClassName,
}: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(" ") || undefined;
  const resolvedValue = value === undefined ? undefined : value === "" ? NONE_VALUE : value;
  const resolvedDefaultValue =
    defaultValue === undefined ? undefined : defaultValue === "" ? NONE_VALUE : defaultValue;

  const handleValueChange = (nextValue: string) => {
    const normalizedValue = nextValue === NONE_VALUE ? "" : nextValue;
    onValueChange?.(normalizedValue);
    onChange?.(normalizedValue);
  };

  const shouldShowLabel = variant === "with-label";
  const computedAriaLabel = !shouldShowLabel ? ariaLabel ?? label ?? placeholder : undefined;

  const selectRoot = (
    <Select.Root
      defaultValue={resolvedDefaultValue}
      disabled={disabled}
      name={name}
      onValueChange={handleValueChange}
      required={required}
      value={resolvedValue}
    >
      <Select.Trigger
        aria-label={computedAriaLabel}
        aria-describedby={describedBy}
        className={cx(getSelectFieldStyles(tone), triggerClassName)}
        id={selectId}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon asChild>
          <ChevronDown className="h-4 w-4 shrink-0 text-[var(--content-tertiary)]" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={selectFieldContentStyles} position="popper" sideOffset={6}>
          <Select.Viewport className={selectFieldViewportStyles}>
            <Select.Item className={selectFieldItemStyles} value={NONE_VALUE}>
              <Select.ItemText>{placeholder}</Select.ItemText>
            </Select.Item>
            {options?.map((option) => (
              <Select.Item className={selectFieldItemStyles} disabled={option.disabled} key={option.value} value={option.value}>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );

  return (
    <div className={cx(selectFieldWrapperStyles, wrapperClassName)}>
      {shouldShowLabel && label ? (
        <label className={selectFieldLabelStyles} htmlFor={selectId}>
          {label}
        </label>
      ) : null}
      {selectRoot}
      {helperText ? (
        <p className={getSelectFieldHelperStyles(tone)} id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export type { SelectFieldOption, SelectFieldProps, SelectFieldVariant } from "./select-field.types";
