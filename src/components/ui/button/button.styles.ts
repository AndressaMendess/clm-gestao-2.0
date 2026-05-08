import type { ButtonVariant } from "./button.types";

const baseStyles =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand-primary-main)] text-[var(--content-inverse)] hover:brightness-95",
  secondary:
    "border border-[var(--border-primary)] bg-transparent text-[var(--brand-secondary-main)] hover:bg-[var(--background-secondary)]",
  ghost:
    "bg-transparent text-[var(--brand-secondary-main)] hover:bg-[var(--background-secondary)]",
};

export function getButtonStyles(variant: ButtonVariant): string {
  return `${baseStyles} ${variantStyles[variant]}`;
}
