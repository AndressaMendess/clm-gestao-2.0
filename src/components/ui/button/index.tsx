import { getButtonStyles, iconButtonStyles } from "./button.styles";
import type { ButtonProps, IconButtonProps } from "./button.types";
import { cx } from "@/lib/cx";

export function Button({
  children,
  icon: Icon,
  className,
  type = "button",
  variant = "primary",
  size = variant === "icon" ? "icon" : "md",
  ...props
}: ButtonProps) {
  const isIconOnly = variant === "icon" || size === "icon";

  return (
    <button className={cx(getButtonStyles(variant, size), className)} type={type} {...props}>
      {Icon ? (
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
          <Icon aria-hidden size={18} />
        </span>
      ) : null}
      {!isIconOnly && children ? <span className="inline-flex items-center">{children}</span> : null}
    </button>
  );
}

export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      className={cx(iconButtonStyles, className)}
      icon={icon}
      size="icon"
      variant="icon"
      {...props}
    />
  );
}

export type { ButtonProps, ButtonSize, ButtonVariant, IconButtonProps } from "./button.types";
