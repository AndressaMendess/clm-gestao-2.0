import { cx } from "@/lib/cx";
import { Topbar } from "../topbar";
import {
  contentShellContainerStyles,
  contentShellContentStyles,
  contentShellWrapperStyles,
} from "./content-shell.styles";
import type { ContentShellProps } from "./content-shell.types";

export function ContentShell({
  children,
  className,
  contentClassName,
  onMenuClick,
  showTopbarMenuButton = true,
}: ContentShellProps) {
  return (
    <section className={cx(contentShellWrapperStyles, className)}>
      <div className={contentShellContainerStyles}>
        <Topbar onMenuClick={onMenuClick} showMenuButton={showTopbarMenuButton} />
        <div className={cx(contentShellContentStyles, contentClassName)}>{children}</div>
      </div>
    </section>
  );
}

export type { ContentShellProps } from "./content-shell.types";
