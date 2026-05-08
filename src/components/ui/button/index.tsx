import { getButtonStyles } from "./button.styles";
import type { ButtonProps } from "./button.types";

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${getButtonStyles(variant)} ${className}`} {...props} />;
}

export type { ButtonProps, ButtonVariant } from "./button.types";
