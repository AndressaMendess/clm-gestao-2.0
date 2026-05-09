import type { InputHelperTone } from "../input";

export const selectFieldWrapperStyles = "flex flex-col gap-1.5";
export const selectFieldLabelStyles =
  "text-[var(--content-primary)] [font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:500] [letter-spacing:var(--typography-body-medium-letter-spacing)]";

const baseSelectTriggerStyles =
  "inline-flex min-h-11 w-full items-center justify-between rounded-[10px] border bg-[var(--background-primary)] px-3 py-2 text-left text-[var(--content-primary)] [font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:var(--typography-body-medium-font-weight)] [letter-spacing:var(--typography-body-medium-letter-spacing)] outline-none transition-[border-color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 data-[placeholder]:text-[var(--content-tertiary)]";

const triggerToneStyles: Record<InputHelperTone, string> = {
  default: "border-[var(--border-primary)] hover:border-[var(--border-tertiary)]",
  error:
    "border-[var(--feedback-error-border)] focus-visible:ring-[var(--feedback-error-content)]",
  success:
    "border-[var(--feedback-success-border)] focus-visible:ring-[var(--feedback-success-content)]",
};

const helperToneStyles: Record<InputHelperTone, string> = {
  default: "text-[var(--content-secondary)]",
  error: "text-[var(--feedback-error-content)]",
  success: "text-[var(--feedback-success-content)]",
};

export function getSelectFieldStyles(tone: InputHelperTone): string {
  return `${baseSelectTriggerStyles} ${triggerToneStyles[tone]}`;
}

export function getSelectFieldHelperStyles(tone: InputHelperTone): string {
  return `[font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:var(--typography-body-medium-font-weight)] [letter-spacing:var(--typography-body-medium-letter-spacing)] ${helperToneStyles[tone]}`;
}

export const selectFieldContentStyles =
  "z-50 max-h-80 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[10px] border border-[var(--border-primary)] bg-[var(--background-primary)] p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]";

export const selectFieldViewportStyles = "p-1";

export const selectFieldItemStyles =
  "relative flex w-full cursor-default select-none items-center rounded-md px-2.5 py-2 text-[var(--content-primary)] [font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:var(--typography-body-medium-font-weight)] [letter-spacing:var(--typography-body-medium-letter-spacing)] outline-none data-[highlighted]:bg-[var(--brand-primary-subtle)] data-[highlighted]:text-[var(--content-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50";
