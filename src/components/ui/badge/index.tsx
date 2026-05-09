import { badgeDotStyles, badgeIconStyles, getBadgeStyles } from "./badge.styles";
import type { BadgeProps } from "./badge.types";

function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function Badge({
  appearance,
  children,
  className,
  icon,
  variant = "default",
  ...props
}: BadgeProps) {
  const resolvedAppearance = appearance ?? (icon ? "icon" : "default");
  const shouldShowDot = resolvedAppearance === "dot";
  const shouldShowIcon = resolvedAppearance === "icon" && Boolean(icon);

  return (
    <span className={cx(getBadgeStyles(variant, resolvedAppearance), className)} {...props}>
      {shouldShowDot ? <span aria-hidden className={badgeDotStyles} /> : null}
      {shouldShowIcon ? (
        <span aria-hidden className={badgeIconStyles}>
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}

export type { BadgeAppearance, BadgeProps, BadgeVariant } from "./badge.types";
