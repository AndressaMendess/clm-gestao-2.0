import { ArrowRight } from "lucide-react";
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
  arrowColorClassName = "text-[var(--content-secondary)]",
  ariaLabel,
  backgroundColorClassName = "bg-[var(--accent-purple-background-primary)]",
  className,
  disabled = false,
  href,
  icon: Icon,
  iconBackgroundColorClassName = "bg-[var(--accent-purple-background-secondary)]",
  iconColorClassName = "text-[var(--accent-purple-content)]",
  onClick,
  subtitle,
  subtitleColorClassName,
  title,
  titleColorClassName,
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
          <Icon className={cx("h-5 w-5", iconColorClassName)} />
        </span>
        <ArrowRight aria-hidden className={cx("h-4 w-4 shrink-0", arrowColorClassName)} />
      </div>

      <div className="mt-6">
        <h3 className={cx(featureCardTitleStyles, titleColorClassName)}>{title}</h3>
        <p className={cx(featureCardSubtitleStyles, subtitleColorClassName)}>{subtitle}</p>
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
