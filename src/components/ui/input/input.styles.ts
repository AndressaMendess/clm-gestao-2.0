import type { InputHelperTone } from "./input.types";

export const inputFieldWrapperStyles = "flex flex-col gap-1.5";
export const inputFieldLabelStyles =
  "text-[var(--content-primary)] [font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)]";

const baseInputStyles =
  "w-full min-h-11 rounded-[10px] border bg-[var(--background-primary)] px-3 py-2 text-[var(--content-primary)] [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--content-tertiary)] placeholder:[font-size:var(--typography-body-medium-regular-font-size)] placeholder:[line-height:var(--typography-body-medium-regular-line-height)] placeholder:[font-weight:var(--typography-body-medium-regular-font-weight)] placeholder:[letter-spacing:var(--typography-body-medium-regular-letter-spacing)] focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const fieldToneStyles: Record<InputHelperTone, string> = {
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

export function getInputFieldStyles(tone: InputHelperTone): string {
  return `${baseInputStyles} ${fieldToneStyles[tone]}`;
}

export function getInputHelperStyles(tone: InputHelperTone): string {
  return `[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] ${helperToneStyles[tone]}`;
}

export function getTextAreaFieldStyles(tone: InputHelperTone): string {
  return `${baseInputStyles} ${fieldToneStyles[tone]} min-h-[120px] resize-y`;
}
