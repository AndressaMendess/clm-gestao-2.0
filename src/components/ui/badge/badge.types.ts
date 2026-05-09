import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "violet"
  | "orange"
  | "blue"
  | "pink"
  | "subtle";

export type BadgeAppearance = "default" | "dot" | "icon";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  appearance?: BadgeAppearance;
  icon?: ReactNode;
  variant?: BadgeVariant;
};
