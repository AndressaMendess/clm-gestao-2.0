import { useId } from "react";
import { cx } from "@/lib/cx";
import {
  tooltipArrowStyles,
  tooltipContentStyles,
  tooltipRootStyles,
  tooltipTextStyles,
  tooltipTriggerStyles,
} from "./tooltip.styles";
import type { TooltipProps } from "./tooltip.types";

export function Tooltip({ children, className, content }: TooltipProps) {
  const tooltipId = useId();

  return (
    <span className={cx(tooltipRootStyles, className)}>
      <span aria-describedby={tooltipId} className={tooltipTriggerStyles} tabIndex={0}>
        {children}
      </span>

      <span className={tooltipContentStyles} id={tooltipId} role="tooltip">
        <span className={tooltipArrowStyles} />
        <span className={tooltipTextStyles}>{content}</span>
      </span>
    </span>
  );
}

export type { TooltipProps } from "./tooltip.types";
