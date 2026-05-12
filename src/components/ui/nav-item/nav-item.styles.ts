import type { NavItemState, NavItemVariant } from "./nav-item.types";

const navItemBaseStyles =
  "group inline-flex w-full items-center gap-2 rounded-3xl border font-[var(--font-family-sans)] text-left transition-[background-color,color,border-color,box-shadow,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2";

const navItemVariantStyles: Record<NavItemVariant, string> = {
  simple: "px-4 py-3",
  composite: "px-4 py-3",
  subitem: "px-4 py-3",
  "simple-collapsed": "justify-center px-0 py-4",
  "composite-collapsed": "justify-center px-0 py-4",
};

const defaultStateStyles: Record<NavItemState, string> = {
  active:
    "border-transparent bg-[var(--button-primary-background-enabled)] text-[var(--button-primary-content-enabled)] shadow-[var(--button-primary-shadow-enabled)] hover:bg-[var(--button-primary-background-hover)]",
  inactive:
    "border-transparent bg-transparent text-[var(--content-tertiary)] hover:bg-[var(--background-primary)] hover:translate-x-px",
};

const subitemStateStyles: Record<NavItemState, string> = {
  active: "border-transparent bg-[var(--brand-primary-subtle)] text-[var(--brand-primary-main)]",
  inactive:
    "border-transparent bg-transparent text-[var(--content-tertiary)] hover:bg-[var(--background-primary)] hover:translate-x-px",
};

export const navItemLabelStyles =
  "truncate font-[var(--font-family-sans)] [font-size:var(--typography-body-large-regular-font-size)] [line-height:var(--typography-body-large-regular-line-height)] [font-weight:var(--typography-body-large-regular-font-weight)] [letter-spacing:var(--typography-body-large-regular-letter-spacing)]";

export function getNavItemStyles(variant: NavItemVariant, state: NavItemState): string {
  const resolvedStateStyles = variant === "subitem" ? subitemStateStyles[state] : defaultStateStyles[state];
  return `${navItemBaseStyles} ${navItemVariantStyles[variant]} ${resolvedStateStyles}`;
}
