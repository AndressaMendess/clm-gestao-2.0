import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";
export type ButtonSize = "sm" | "md" | "icon";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export type IconButtonProps = Omit<ButtonProps, "children" | "size" | "variant"> & {
  icon: LucideIcon;
  label: string;
};
