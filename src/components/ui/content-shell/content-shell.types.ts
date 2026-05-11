import type { ReactNode } from "react";

export type ContentShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  onMenuClick?: () => void;
  showTopbarMenuButton?: boolean;
};
