import type { BadgeAppearance, BadgeVariant } from "./badge.types";

const baseStyles =
  "inline-flex min-h-6 items-center justify-center rounded-full border text-xs font-medium whitespace-nowrap leading-4";

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "border-[var(--border-primary)] bg-[var(--background-secondary)] text-[var(--content-secondary)]",
  success:
    "border-transparent bg-[var(--feedback-success-background)] text-[var(--feedback-success-content)]",
  error:
    "border-transparent bg-[var(--feedback-error-background)] text-[var(--feedback-error-content)]",
  warning:
    "border-transparent bg-[var(--feedback-warning-background)] text-[var(--feedback-warning-content)]",
  violet:
    "border-transparent bg-[var(--accent-purple-background-primary)] text-[var(--accent-purple-content)]",
  orange:
    "border-transparent bg-[var(--brand-primary-subtle)] text-[var(--brand-primary-strong)]",
  blue:
    "border-transparent bg-[var(--accent-blue-background-primary)] text-[var(--accent-blue-content)]",
  pink:
    "border-transparent bg-[var(--accent-pink-background-primary)] text-[var(--accent-pink-content)]",
  subtle:
    "border-[var(--border-secondary)] bg-[var(--background-tertiary)] text-[var(--content-secondary)]",
};

const appearanceStyles: Record<BadgeAppearance, string> = {
  default: "px-2.5 py-1",
  dot: "gap-1.5 py-0.5 pl-1.5 pr-2",
  icon: "gap-1.5 py-0.5 pl-1.5 pr-2",
};

export const badgeDotStyles = "inline-block h-1.5 w-1.5 rounded-full bg-current";
export const badgeIconStyles = "inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center";

export function getBadgeStyles(variant: BadgeVariant, appearance: BadgeAppearance): string {
  return `${baseStyles} ${variantStyles[variant]} ${appearanceStyles[appearance]}`;
}
