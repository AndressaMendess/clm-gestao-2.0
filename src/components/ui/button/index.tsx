import { buttonSpinnerStyles, getButtonStyles, iconButtonStyles } from "./button.styles";
import type { ButtonProps, IconButtonProps } from "./button.types";
import { cx } from "@/lib/cx";

export function Button({
  children,
  icon: Icon,
  loading = false,
  loadingLabel = "Carregando",
  className,
  type = "button",
  variant = "primary",
  size = variant === "icon" ? "icon" : "md",
  ...props
}: ButtonProps) {
  const isIconOnly = variant === "icon" || size === "icon";
  const { disabled, ["aria-label"]: ariaLabel, ...restProps } = props;
  const isDisabled = Boolean(disabled || loading);

  return (
    <button
      aria-busy={loading || undefined}
      aria-label={loading && isIconOnly ? loadingLabel : ariaLabel}
      className={cx(getButtonStyles(variant, size), className)}
      disabled={isDisabled}
      type={type}
      {...restProps}
    >
      {loading ? (
        <span aria-hidden className={buttonSpinnerStyles} />
      ) : Icon ? (
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
          <Icon aria-hidden size={18} />
        </span>
      ) : null}
      {!isIconOnly && (children || loading) ? (
        <span className="inline-flex items-center">{loading ? loadingLabel : children}</span>
      ) : null}
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
