import type { LucideIcon } from "lucide-react";

export type FeatureCardProps = {
  arrowColorClassName?: string;
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
  subtitleColorClassName?: string;
  title: string;
  titleColorClassName?: string;
};
