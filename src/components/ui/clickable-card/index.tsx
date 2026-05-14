import { ChevronRight } from "lucide-react";
import { cx } from "@/lib/cx";
import {
  clickableCardContentStyles,
  clickableCardDisabledStyles,
  clickableCardIconStyles,
  clickableCardRootStyles,
  clickableCardSubtitleStyles,
  clickableCardTitleStyles,
} from "./clickable-card.styles";
import type { ClickableCardProps } from "./clickable-card.types";

export function ClickableCard({
  ariaLabel,
  className,
  disabled = false,
  onClick,
  subtitle,
  title,
}: ClickableCardProps) {
  return (
    <button
      aria-label={ariaLabel ?? `${title} - ${subtitle}`}
      className={cx(clickableCardRootStyles, disabled && clickableCardDisabledStyles, className)}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span className={clickableCardContentStyles}>
        <span className={clickableCardTitleStyles}>{title}</span>
        <span className={clickableCardSubtitleStyles}>{subtitle}</span>
      </span>

      <ChevronRight aria-hidden="true" className={clickableCardIconStyles} />
    </button>
  );
}

export type { ClickableCardProps } from "./clickable-card.types";
