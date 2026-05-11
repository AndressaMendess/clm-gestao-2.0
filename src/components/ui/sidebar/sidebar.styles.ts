import { cx } from "@/lib/cx";

export const sidebarOverlayStyles =
  "fixed inset-0 z-40 bg-[rgb(0_0_0_/_0.45)] transition-opacity duration-200 lg:hidden";

export function getSidebarOverlayStateStyles(open: boolean): string {
  return open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0";
}

export const sidebarShellStyles =
  "z-50 flex h-screen w-[280px] shrink-0 flex-col border-r border-[var(--border-primary)] bg-[var(--background-secondary)] transition-[width,transform] duration-200";

export function getSidebarStateStyles(collapsed: boolean, open: boolean): string {
  return cx(
    collapsed ? "w-[92px]" : "w-[280px]",
    open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
    "fixed left-0 top-0 lg:relative lg:translate-x-0",
  );
}

export const sidebarHeaderStyles = "flex items-center justify-between gap-2 px-4 py-4";
export const sidebarBrandStyles = "inline-flex items-center gap-2";
export const sidebarBrandBadgeStyles =
  "inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--brand-primary-main)] text-[var(--content-inverse)] [font-size:var(--typography-body-small-font-size)] [font-weight:600]";
export const sidebarBrandTextStyles =
  "text-[var(--content-primary)] [font-size:var(--typography-body-large-font-size)] [line-height:var(--typography-body-large-line-height)] [font-weight:600]";

export const sidebarIconButtonStyles =
  "inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--border-primary)] text-[var(--content-secondary)] transition-colors hover:bg-[var(--background-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2";

export const sidebarContentStyles = "flex flex-1 flex-col overflow-y-auto px-3 pb-3";
export const sidebarNavStyles = "flex flex-col gap-1";
export const sidebarNavBlocksStyles = "flex flex-col gap-5";

export function getSidebarLabelVisibilityStyles(collapsed: boolean): string {
  return collapsed ? "hidden lg:hidden" : "inline";
}

export const sidebarDividerStyles = "h-px w-full bg-[var(--border-primary)]";

export const sidebarModulesListStyles = "mt-1 flex flex-col gap-1 pl-4";

export const sidebarFooterStyles = "mt-auto border-t border-[var(--border-primary)] px-4 py-3";
export const sidebarUserNameStyles =
  "truncate text-[var(--content-primary)] [font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:600]";
export const sidebarUserEmailStyles =
  "truncate text-[var(--content-tertiary)] [font-size:var(--typography-body-small-font-size)] [line-height:var(--typography-body-small-line-height)]";
export const sidebarLogoutStyles =
  "mt-3 inline-flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[var(--content-secondary)] transition-colors hover:bg-[var(--background-primary)] hover:text-[var(--content-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2";
