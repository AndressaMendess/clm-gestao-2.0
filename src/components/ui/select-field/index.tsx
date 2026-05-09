"use client";

import { Check, ChevronDown } from "lucide-react";
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

export function SelectField({
  "aria-describedby": ariaDescribedBy,
  defaultValue,
  disabled,
  helperText,
  id,
  label,
  name,
  onValueChange,
  options,
  placeholder = "Selecione",
  required,
  tone = "default",
  triggerClassName,
  value,
  wrapperClassName,
}: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const describedBy = [ariaDescribedBy, helperId].filter(Boolean).join(" ") || undefined;

  const selectRoot = (
    <Select.Root defaultValue={defaultValue} disabled={disabled} name={name} onValueChange={onValueChange} required={required} value={value}>
      <Select.Trigger
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
            {options?.map((option) => (
              <Select.Item className={selectFieldItemStyles} disabled={option.disabled} key={option.value} value={option.value}>
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2 inline-flex items-center">
                  <Check className="h-4 w-4 text-[var(--brand-primary-main)]" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );

  return (
    <div className={cx(selectFieldWrapperStyles, wrapperClassName)}>
      <label className={selectFieldLabelStyles} htmlFor={selectId}>
        {label}
      </label>
      {selectRoot}
      {helperText ? (
        <p className={getSelectFieldHelperStyles(tone)} id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export type { SelectFieldOption, SelectFieldProps } from "./select-field.types";
