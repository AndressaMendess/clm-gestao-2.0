import type { StepperStatus } from "./stepper.types";

export const stepperNavStyles = "w-full";

export const stepperListStyles =
  "m-0 flex w-full list-none items-start gap-0 p-0";

export const stepperItemStyles = "relative flex min-w-0 flex-1 flex-col items-center gap-2";

export const stepperIndicatorRowStyles = "relative flex h-9 w-full items-center justify-center";

const indicatorBaseStyles =
  "relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-[var(--font-family-sans)] text-[var(--typography-body-small-regular-font-size)] [line-height:var(--typography-body-small-regular-line-height)] [font-weight:var(--typography-body-small-regular-font-weight)] [letter-spacing:var(--typography-body-small-regular-letter-spacing)]";

const indicatorStatusStyles: Record<StepperStatus, string> = {
  complete:
    "border-transparent bg-[var(--feedback-success-background)] text-[var(--feedback-success-content)]",
  current:
    "border-[var(--brand-primary-main)] bg-[var(--brand-primary-main)] !text-[var(--content-inverse)]",
  upcoming:
    "border-[var(--border-primary)] bg-[var(--background-primary)] text-[var(--content-tertiary)]",
};

const indicatorTypographyStatusStyles: Record<StepperStatus, string> = {
  complete: "",
  current: "[font-weight:var(--typography-body-small-medium-font-weight)]",
  upcoming: "",
};

const labelStatusStyles: Record<StepperStatus, string> = {
  complete: "!text-[var(--feedback-success-content)]",
  current: "!text-[var(--brand-primary-main)]",
  upcoming: "!text-[var(--content-tertiary)]",
};

const connectorStatusStyles: Record<Exclude<StepperStatus, "current">, string> = {
  complete: "bg-[var(--feedback-success-border)]",
  upcoming: "bg-[var(--border-primary)]",
};

export const stepperCheckIconStyles = "h-4 w-4 text-[var(--feedback-success-content)]";

export const stepperLabelBaseStyles =
  "mt-1 max-w-[140px] text-center font-[var(--font-family-sans)] text-[var(--typography-body-small-regular-font-size)] [line-height:var(--typography-body-small-regular-line-height)] [font-weight:var(--typography-body-small-regular-font-weight)] [letter-spacing:var(--typography-body-small-regular-letter-spacing)]";

const labelTypographyStatusStyles: Record<StepperStatus, string> = {
  complete: "",
  current: "[font-weight:var(--typography-body-small-medium-font-weight)]",
  upcoming: "",
};

export const stepperConnectorBaseStyles =
  "pointer-events-none absolute left-1/2 right-[-50%] top-1/2 h-[2px] -translate-y-1/2 rounded-full";

export function getStepperIndicatorStyles(status: StepperStatus): string {
  return `${indicatorBaseStyles} ${indicatorStatusStyles[status]} ${indicatorTypographyStatusStyles[status]}`;
}

export function getStepperLabelStyles(status: StepperStatus): string {
  return `${stepperLabelBaseStyles} ${labelStatusStyles[status]} ${labelTypographyStatusStyles[status]}`;
}

export function getStepperConnectorStyles(status: Exclude<StepperStatus, "current">): string {
  return `${stepperConnectorBaseStyles} ${connectorStatusStyles[status]}`;
}
