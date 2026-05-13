export const tabsRootStyles = "inline-flex items-center gap-4";

export const tabsTriggerBaseStyles =
  "inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent bg-transparent px-1 py-1 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed";

export const tabsTriggerActiveStyles =
  "border-b-[var(--brand-primary-main)] text-[var(--brand-primary-main)] [font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)]";

export const tabsTriggerInactiveStyles =
  "text-[var(--button-ghost-content-disabled)] [font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)] hover:text-[var(--brand-primary-main)]";
