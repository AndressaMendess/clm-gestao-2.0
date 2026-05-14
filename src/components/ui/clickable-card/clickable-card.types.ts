import type { MouseEventHandler } from "react";

export type ClickableCardProps = {
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  subtitle: string;
  title: string;
};
