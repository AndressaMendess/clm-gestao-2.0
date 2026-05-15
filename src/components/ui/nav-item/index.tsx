import { ChevronDown } from "lucide-react";
import { cx } from "@/lib/cx";
import { Tooltip } from "../tooltip";
import { getNavItemStyles, navItemLabelStyles } from "./nav-item.styles";
import type { NavItemProps } from "./nav-item.types";

export function NavItem({
  ariaLabel,
  ariaControls,
  ariaExpanded,
  children,
  className,
  icon: Icon,
  label,
  onClick,
  showChevron = false,
  showLabel = true,
  state = "inactive",
  variant = "simple",
}: NavItemProps) {
  const isCollapsedVariant = variant === "simple-collapsed" || variant === "composite-collapsed";
  const buttonElement = (
    <button
      aria-label={ariaLabel ?? (isCollapsedVariant || !showLabel ? label : undefined)}
      aria-controls={ariaControls}
      aria-expanded={showChevron && !isCollapsedVariant ? ariaExpanded : undefined}
      aria-current={state === "active" && (variant === "simple" || variant === "simple-collapsed") ? "page" : undefined}
      className={cx(getNavItemStyles(variant, state), className)}
      onClick={onClick}
      type="button"
    >
      {Icon ? <Icon className="h-5 w-5 shrink-0" /> : null}
      {showLabel && !isCollapsedVariant ? <span className={navItemLabelStyles}>{label}</span> : null}
      {showChevron && showLabel && !isCollapsedVariant ? (
        <ChevronDown className={cx("ml-auto h-4 w-4 transition-transform", ariaExpanded ? "rotate-180" : "rotate-0")} />
      ) : null}
    </button>
  );

  return (
    <div className="w-full">
      {isCollapsedVariant ? <Tooltip content={label}>{buttonElement}</Tooltip> : buttonElement}
      {variant === "composite" && children ? <div className="mt-1 pl-4">{children}</div> : null}
    </div>
  );
}

export type { NavItemProps, NavItemState, NavItemVariant } from "./nav-item.types";
