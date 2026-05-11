import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type NavItemState = "active" | "inactive";
export type NavItemVariant =
  | "simple"
  | "composite"
  | "subitem"
  | "simple-collapsed"
  | "composite-collapsed";

export type NavItemProps = {
  ariaLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  children?: ReactNode;
  className?: string;
  icon?: LucideIcon;
  label: string;
  onClick?: () => void;
  showChevron?: boolean;
  showLabel?: boolean;
  state?: NavItemState;
  variant?: NavItemVariant;
};
