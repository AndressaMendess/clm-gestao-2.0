import type { LucideIcon } from "lucide-react";

export type FeatureCardProps = {
  ariaLabel?: string;
  backgroundColorClassName?: string;
  className?: string;
  disabled?: boolean;
  href?: string;
  icon: LucideIcon;
  iconBackgroundColorClassName?: string;
  iconColorClassName?: string;
  onClick?: () => void;
  subtitle: string;
  title: string;
};
