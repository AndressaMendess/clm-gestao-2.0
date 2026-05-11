import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cx } from "@/lib/cx";
import {
  featureCardDisabledStyles,
  featureCardHeaderStyles,
  featureCardIconContainerStyles,
  featureCardRootStyles,
  featureCardSubtitleStyles,
  featureCardTitleStyles,
} from "./feature-card.styles";
import type { FeatureCardProps } from "./feature-card.types";

export function FeatureCard({
  ariaLabel,
  backgroundColorClassName = "bg-[var(--accent-purple-background)]",
  className,
  disabled = false,
  href,
  icon: Icon,
  iconBackgroundColorClassName = "bg-[var(--color-purple-200)]",
  iconColorClassName = "text-[var(--accent-purple-content)]",
  onClick,
  subtitle,
  title,
}: FeatureCardProps) {
  const commonClassName = cx(
    featureCardRootStyles,
    backgroundColorClassName,
    disabled && featureCardDisabledStyles,
    className,
  );

  const content = (
    <>
      <div className={featureCardHeaderStyles}>
        <span aria-hidden className={cx(featureCardIconContainerStyles, iconBackgroundColorClassName)}>
          <Icon className={cx("h-7 w-7", iconColorClassName)} />
        </span>
        <ArrowUpRight aria-hidden className="h-6 w-6 shrink-0 text-[var(--content-secondary)]" />
      </div>

      <div className="mt-6">
        <h3 className={featureCardTitleStyles}>{title}</h3>
        <p className={featureCardSubtitleStyles}>{subtitle}</p>
      </div>
    </>
  );

  if (href && !disabled) {
    return (
      <Link aria-label={ariaLabel ?? title} className={commonClassName} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button
      aria-label={ariaLabel ?? title}
      aria-disabled={disabled || (!href && !onClick) || undefined}
      className={commonClassName}
      disabled={disabled || (!href && !onClick)}
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
}

export type { FeatureCardProps } from "./feature-card.types";
