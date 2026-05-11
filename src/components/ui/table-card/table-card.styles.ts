import type { TableCardAlign } from "./table-card.types";

export const tableCardContainerStyles =
  "w-full overflow-hidden rounded-2xl bg-[var(--background-primary)] shadow-[0_8px_24px_rgb(0_0_0_/_0.06)]";

export const tableCardHeaderBarStyles =
  "flex items-center gap-2 border-b border-[var(--border-primary)] px-4 py-4";

export const tableCardTitleStyles =
  "text-[var(--content-primary)] [font-size:var(--typography-body-x-large-semibold-font-size)] [line-height:var(--typography-body-x-large-semibold-line-height)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [letter-spacing:var(--typography-body-x-large-semibold-letter-spacing)]";

export const tableCardTitleBadgeStyles =
  "px-2.5 py-1 [font-size:var(--typography-body-small-medium-font-size)] [line-height:var(--typography-body-small-medium-line-height)] [font-weight:var(--typography-body-small-medium-font-weight)] [letter-spacing:var(--typography-body-small-medium-letter-spacing)]";

export const tableCardSubtitleStyles =
  "text-[var(--content-secondary)] [font-size:var(--typography-body-small-font-size)] [line-height:var(--typography-body-small-line-height)]";

export const tableCardTableStyles = "w-full border-collapse";
export const tableCardTableMinWidthStyles = "min-w-[760px]";
export const tableCardScrollWrapperStyles = "hidden overflow-x-auto sm:block";

export const tableCardHeadRowStyles = "border-b border-[var(--border-primary)] bg-[var(--background-secondary)]";

export const tableCardHeadCellBaseStyles =
  "px-4 py-3 text-[var(--content-secondary)] [font-size:var(--typography-body-small-font-size)] [line-height:var(--typography-body-small-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-letter-spacing)]";

export const tableCardSelectionCellStyles = "w-10 px-3 py-3";

export const tableCardHeadSortButtonStyles =
  "inline-flex w-full items-center gap-1 text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2";

export const tableCardBodyRowStyles =
  "border-b border-[var(--border-primary)] last:border-b-0 transition-colors hover:bg-[var(--background-secondary)]";

export const tableCardBodyCellBaseStyles =
  "px-4 py-3 text-[var(--content-secondary)] [font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-letter-spacing)]";

export const tableCardStatusRowStyles = "border-b-0";

export const tableCardStatusCellStyles =
  "px-4 py-6 text-center text-[var(--content-secondary)] [font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-letter-spacing)]";

export const tableCardClickableRowStyles = "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)]";
export const tableCardMobileListStyles = "space-y-3 p-3 sm:hidden";
export const tableCardMobileItemStyles =
  "rounded-xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-3";
export const tableCardMobileRowTopStyles = "mb-2 flex items-start gap-2";
export const tableCardMobileFieldStyles = "grid gap-1 py-2 first:pt-0";
export const tableCardMobileFieldLabelStyles =
  "text-[var(--content-secondary)] [font-size:var(--typography-body-small-font-size)] [line-height:var(--typography-body-small-line-height)] [font-weight:var(--typography-body-small-semibold-font-weight)] [letter-spacing:var(--typography-body-small-letter-spacing)]";

export function getTableCardAlignStyles(align: TableCardAlign = "left"): string {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

export function getTableCardFlexAlignStyles(align: TableCardAlign = "left"): string {
  if (align === "center") return "justify-center";
  if (align === "right") return "justify-end";
  return "justify-start";
}
