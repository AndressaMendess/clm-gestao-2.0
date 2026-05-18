import type { ButtonSize, ButtonVariant } from "./button.types";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-2xl border text-sm font-medium leading-5 tracking-[-0.28px] transition-[background-color,color,border-color,box-shadow] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-[var(--button-primary-background-enabled)] text-[var(--button-primary-content-enabled)] shadow-[var(--button-primary-shadow-enabled)] hover:bg-[var(--button-primary-background-hover)] hover:text-[var(--button-primary-content-hover)] active:bg-[var(--button-primary-background-pressed)] active:text-[var(--button-primary-content-pressed)] disabled:bg-[var(--button-primary-background-disabled)] disabled:text-[var(--button-primary-content-disabled)] disabled:shadow-none",
  secondary:
    "border [border-width:var(--button-secondary-border-width)] bg-[var(--button-secondary-background-enabled)] border-[var(--button-secondary-border-enabled)] text-[var(--button-secondary-content-enabled)] hover:bg-[var(--button-secondary-background-hover)] hover:border-[var(--button-secondary-border-hover)] hover:text-[var(--button-secondary-content-hover)] active:bg-[var(--button-secondary-background-pressed)] active:border-[var(--button-secondary-border-pressed)] active:text-[var(--button-secondary-content-pressed)] focus-visible:border-[var(--button-secondary-border-focus)] disabled:bg-[var(--button-secondary-background-disabled)] disabled:border-[var(--button-secondary-border-disabled)] disabled:text-[var(--button-secondary-content-disabled)]",
  ghost:
    "border-transparent bg-[var(--button-ghost-background-enabled)] text-[var(--button-ghost-content-enabled)] hover:bg-[var(--button-ghost-background-hover)] hover:text-[var(--button-ghost-content-hover)] active:bg-[var(--button-ghost-background-pressed)] active:text-[var(--button-ghost-content-pressed)] disabled:bg-[var(--button-ghost-background-disabled)] disabled:text-[var(--button-ghost-content-disabled)]",
  danger:
    "border-transparent bg-[var(--feedback-error-background)] text-[var(--feedback-error-content)] hover:bg-[var(--feedback-error-border)] active:bg-[var(--feedback-error-content)] active:text-[var(--content-inverse)] disabled:bg-[var(--background-secondary)] disabled:text-[var(--content-tertiary)]",
  icon:
    "border-transparent bg-transparent text-[var(--content-tertiary)] hover:bg-[var(--button-ghost-background-hover)] active:bg-[var(--button-ghost-background-pressed)] disabled:text-[var(--button-ghost-content-disabled)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2.5",
  md: " px-6 py-2.5",
  icon: "h-10 w-10 min-w-10 rounded-[12px] p-0",
};

export const iconButtonStyles =
  "inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-[var(--content-tertiary)]";

export const buttonSpinnerStyles =
  "inline-flex h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent";

export function getButtonStyles(variant: ButtonVariant, size: ButtonSize): string {
  return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;
}
