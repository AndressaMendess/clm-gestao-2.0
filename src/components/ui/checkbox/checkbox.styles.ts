import type { CheckboxSize, CheckboxVariant } from "./checkbox.types";

const baseStyles =
  "peer shrink-0 appearance-none border bg-[var(--background-primary)] shadow-xs outline-none transition-[background-color,border-color,box-shadow] duration-150 hover:border-[var(--border-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<CheckboxVariant, string> = {
  default:
    "border-[var(--border-secondary)] checked:border-[var(--brand-primary-main)] checked:bg-[var(--brand-primary-main)] data-[state=indeterminate]:border-[var(--brand-primary-main)] data-[state=indeterminate]:bg-[var(--brand-primary-main)] disabled:checked:border-[var(--border-secondary)] disabled:checked:bg-[var(--background-tertiary)] disabled:data-[state=indeterminate]:border-[var(--border-secondary)] disabled:data-[state=indeterminate]:bg-[var(--background-tertiary)]",
  success:
    "border-[var(--border-secondary)] checked:border-[var(--feedback-success-content)] checked:bg-[var(--feedback-success-content)] data-[state=indeterminate]:border-[var(--feedback-success-content)] data-[state=indeterminate]:bg-[var(--feedback-success-content)] disabled:checked:border-[var(--border-secondary)] disabled:checked:bg-[var(--background-tertiary)] disabled:data-[state=indeterminate]:border-[var(--border-secondary)] disabled:data-[state=indeterminate]:bg-[var(--background-tertiary)]",
};

const iconVariantStyles: Record<CheckboxVariant, string> = {
  default: "text-[var(--content-inverse)]",
  success: "text-[var(--content-inverse)]",
};

const sizeStyles: Record<CheckboxSize, string> = {
  sm: "h-4 w-4 rounded-[4px]",
  md: "h-5 w-5 rounded-[6px]",
  lg: "h-7 w-7 rounded-[10px]",
};

export const checkboxIndicatorStyles =
  "pointer-events-none absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity duration-150 peer-checked:opacity-100 peer-data-[state=indeterminate]:opacity-100";

const iconSizeStyles: Record<CheckboxSize, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

export function getCheckboxStyles(variant: CheckboxVariant, size: CheckboxSize): string {
  return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;
}

export function getCheckboxIndicatorStyles(variant: CheckboxVariant, size: CheckboxSize): string {
  return `${checkboxIndicatorStyles} ${iconVariantStyles[variant]}`;
}

export function getCheckboxIconStyles(size: CheckboxSize): string {
  return `block ${iconSizeStyles[size]}`;
}
