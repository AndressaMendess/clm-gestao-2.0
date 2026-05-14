import type { LucideIcon } from "lucide-react";
import type { BadgeVariant } from "../badge";

export type ListCollapsibleItem = {
  badgeLabel: string;
  badgeVariant?: BadgeVariant;
  id: string;
  text: string;
};

export type ListCollapsibleProps = {
  className?: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  icon?: LucideIcon;
  items?: ListCollapsibleItem[];
  onExpandedChange?: (expanded: boolean) => void;
  subtitle?: string;
  title?: string;
};
