import type { InputHelperTone } from "../input";

export const documentUploadFieldWrapperStyles = "flex flex-col gap-1.5";
export const documentUploadFieldLabelStyles =
  "text-[var(--content-primary)] [font-size:var(--typography-body-medium-medium-font-size)] [line-height:var(--typography-body-medium-medium-line-height)] [font-weight:var(--typography-body-medium-medium-font-weight)] [letter-spacing:var(--typography-body-medium-medium-letter-spacing)]";

const baseDropzoneStyles =
  "w-full rounded-[10px] border border-dashed bg-[var(--background-primary)] p-4 text-left outline-none transition-[border-color,box-shadow,background-color] duration-150 focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const dropzoneToneStyles: Record<InputHelperTone, string> = {
  default: "border-[var(--border-primary)] hover:border-[var(--border-tertiary)]",
  error:
    "border-[var(--feedback-error-border)] bg-[var(--feedback-error-background)] focus-visible:ring-[var(--feedback-error-content)]",
  success:
    "border-[var(--feedback-success-border)] bg-[var(--feedback-success-background)] focus-visible:ring-[var(--feedback-success-content)]",
};

const helperToneStyles: Record<InputHelperTone, string> = {
  default: "text-[var(--content-secondary)]",
  error: "text-[var(--feedback-error-content)]",
  success: "text-[var(--feedback-success-content)]",
};

export function getDocumentUploadDropzoneStyles(tone: InputHelperTone): string {
  return `${baseDropzoneStyles} ${dropzoneToneStyles[tone]}`;
}

export function getDocumentUploadHelperStyles(tone: InputHelperTone): string {
  return `[font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:var(--typography-body-medium-font-weight)] [letter-spacing:var(--typography-body-medium-letter-spacing)] ${helperToneStyles[tone]}`;
}

export const documentUploadDropzoneRootStyles = "group relative";

export function getDocumentUploadDropzonePadding(hasFile: boolean): string {
  return hasFile ? "p-0" : "p-4";
}

export const documentUploadEmptyContentStyles =
  "flex min-h-20 flex-col items-center justify-center gap-1 text-center";

export const documentUploadEmptyTitleStyles =
  "text-[var(--content-primary)] [font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:500] [letter-spacing:var(--typography-body-medium-letter-spacing)]";

export const documentUploadEmptySubtitleStyles =
  "text-[var(--content-secondary)] [font-size:var(--typography-body-small-font-size)] [line-height:var(--typography-body-small-line-height)] [font-weight:var(--typography-body-small-font-weight)] [letter-spacing:var(--typography-body-small-letter-spacing)]";

export const documentUploadSelectedContentStyles =
  "flex min-h-20 items-center px-3 py-2 pr-12";

export const documentUploadSelectedFileRowStyles = "flex min-w-0 items-center gap-2";
export const documentUploadSelectedImagePreviewStyles =
  "h-20 w-30 shrink-0 rounded-[8px] border border-[var(--feedback-success-border)] object-cover";

export const documentUploadSelectedFileNameStyles =
  "truncate text-[var(--feedback-success-content)] [font-size:var(--typography-body-medium-font-size)] [line-height:var(--typography-body-medium-line-height)] [font-weight:500] [letter-spacing:var(--typography-body-medium-letter-spacing)]";

export const documentUploadSelectedFileSizeStyles =
  "text-[var(--feedback-success-content)]/80 [font-size:var(--typography-body-small-font-size)] [line-height:var(--typography-body-small-line-height)]";

export const documentUploadRemoveButtonStyles =
  "absolute right-5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[var(--feedback-success-content)] transition-colors hover:bg-[var(--background-primary)] hover:text-[var(--feedback-error-content)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)]";
