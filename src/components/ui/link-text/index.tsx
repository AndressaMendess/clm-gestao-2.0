import { cx } from "@/lib/cx";
import { linkTextDisabledStyles, linkTextStyles } from "./link-text.styles";
import type { LinkTextProps } from "./link-text.types";

export function LinkText({
  children,
  className,
  ["aria-disabled"]: ariaDisabled,
  ...props
}: LinkTextProps) {
  const isDisabled = ariaDisabled === true;

  return (
    <a
      className={cx(linkTextStyles, isDisabled && linkTextDisabledStyles, className)}
      tabIndex={isDisabled ? -1 : props.tabIndex}
      {...props}
    >
      {children}
    </a>
  );
}

export type { LinkTextProps } from "./link-text.types";

