import { cx } from "@/lib/cx";
import { Topbar } from "../topbar";
import { contentShellContainerStyles, contentShellWrapperStyles } from "./content-shell.styles";
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
      <div className={cx(contentShellContainerStyles, contentClassName)}>
        <Topbar onMenuClick={onMenuClick} showMenuButton={showTopbarMenuButton} />
        {children}
      </div>
    </section>
  );
}

export type { ContentShellProps } from "./content-shell.types";
